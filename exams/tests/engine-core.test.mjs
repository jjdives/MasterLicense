import test from 'node:test';
import assert from 'node:assert/strict';
import {shuffle, validQuestion, createAttempt, evaluate, reconcileMissed, saveableItems, restoreItems} from '../engine-core.mjs';
const bank = [
  {id:'q1',stem:'Choose answer one',options:[{id:'a',text:'A'},{id:'b',text:'B'},{id:'c',text:'C'},{id:'d',text:'D'}],correctOptionId:'b',explanation:'Answer B is correct.'},
  {id:'q2',stem:'Choose answer two',options:[{id:'a',text:'A'},{id:'b',text:'B'},{id:'c',text:'C'},{id:'d',text:'D'}],correctOptionId:'d',explanation:'Answer D is correct.'}
];
test('shuffle is permutation and does not mutate source',()=>{
 const arr=[1,2,3,4];const result=shuffle(arr,()=>0);
 assert.deepEqual(arr,[1,2,3,4]);
 assert.deepEqual(result.slice().sort(),arr);
});
test('createAttempt preserves identity after choice shuffle',()=>{
 const items=createAttempt(bank,2,()=>0);
 assert.equal(items.length,2);
 for(const q of items){
   assert.equal(q.shown.length,4);
   assert.ok(q.shown.some(o=>o.id===q.correctOptionId));
   assert.equal(new Set(q.shown.map(o=>o.id)).size,4);
 }
});
test('grades correctness by option id, independent of displayed letter',()=>{
 const items=createAttempt(bank,2,()=>0);
 assert.deepEqual(evaluate(items,{q1:'b',q2:'d'}),{score:2,total:2,missed:[]});
 assert.deepEqual(evaluate(items,{q1:'a',q2:'d'}),{score:1,total:2,missed:['q1']});
});
test('missed-question backlog accumulates and clears when mastered',()=>{
 const items=createAttempt(bank,2,()=>0);
 assert.deepEqual(new Set(reconcileMissed(['older'],items,{q1:'a',q2:'d'})),new Set(['older','q1']));
 assert.deepEqual(new Set(reconcileMissed(['older','q1'],items,{q1:'b',q2:'d'})),new Set(['older']));
});
test('saved attempt restores exactly the same answer ordering',()=>{
 const items=createAttempt(bank,2,()=>0);
 const restored=restoreItems(saveableItems(items),bank);
 assert.deepEqual(restored.map(q=>q.shown.map(o=>o.id)),items.map(q=>q.shown.map(o=>o.id)));
});
test('invalid answer ids and duplicate question ids fail fast',()=>{
 assert.equal(validQuestion({...bank[0],correctOptionId:'z'}),false);
 assert.throws(()=>createAttempt([bank[0],bank[0]],2),/Duplicate/);
});
test('cannot restore a deleted or modified choice',()=>{
 const snapshot=saveableItems(createAttempt(bank,2,()=>0));
 assert.throws(()=>restoreItems(snapshot,bank.filter(q=>q.id==='q1')),/no longer exists/);
 assert.throws(()=>restoreItems([{id:'q1',optionIds:['a','a','b','c']}],bank),/order/);
});
