#!/usr/bin/env node
// TEMP development validator. Delete or move into permanent tests before releasing.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const files=["exams/data/q100.json","exams/data/q347-candidates.json","exams/data/q348-candidates.json"];
const moduleIds=new Set(JSON.parse(readFileSync(resolve("exams/data/modules.json"),"utf8")).modules.map(m=>m.id));
let failed=0,all=0;const allIds=new Set();
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
for(const file of files){
 const items=JSON.parse(readFileSync(resolve(file),"utf8"));
 const stems=new Set();let warnings=0;
 for(const q of items){
   all++;
   const errors=[];
   if(!/^[a-z0-9-]+$/.test(q.id??""))errors.push("invalid ID");
   if(allIds.has(q.id))errors.push("duplicate global ID");
   allIds.add(q.id);
   if(!moduleIds.has(q.module))errors.push("unknown module");
   if(!q.stem||q.stem.length<12)errors.push("missing/short stem");
   if(!Array.isArray(q.options)||q.options.length!==4)errors.push("not four options");
   if(new Set((q.options||[]).map(o=>o.id)).size!==(q.options||[]).length)errors.push("duplicate option ID");
   if(new Set((q.options||[]).map(o=>normalize(o.text||""))).size!==(q.options||[]).length)errors.push("duplicate distractor");
   if(!(q.options||[]).some(o=>o.id===q.correctOptionId))errors.push("answer does not match option");
   if(!q.explanation||q.explanation.length<30)errors.push("missing/short explanation");
   if(!q.source?.url?.startsWith("https://"))errors.push("missing source URL");
   const norm=normalize(q.stem||"");
   if(stems.has(norm))errors.push("duplicate exact stem");
   stems.add(norm);
   if(q.reviewStatus!=="verified")warnings++;
   if(errors.length){failed++;console.error(file,q.id,errors.join("; "))}
 }
 console.log(file+": "+items.length+" questions; "+warnings+" without verified review status");
}
console.log("Total "+all+" items. "+failed+" validation failures.");
if(failed)process.exit(1);
