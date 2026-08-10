#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execFileSync } from "node:child_process"

const ROOT = process.cwd()
const CONFIG = [
  { bookId:"tit", file:"17-tit.json", baseline:"84186d034a6b8f038756f7543177659dcf5d8e13" },
  { bookId:"filimon", file:"18-filimon.json", baseline:"bd70b740fe08c69d2dfc2df39675dad95fc24559" },
]
const sha = value => `sha256:${crypto.createHash("sha256").update(String(value)).digest("hex")}`
const payload = unit => ({
  heading:String(unit.heading??""),
  teaching:String(unit.teaching??""),
  forYourHeart:String(unit.forYourHeart??""),
})
const snap = unit => JSON.stringify(payload(unit))

for (const cfg of CONFIG) {
  const current = JSON.parse(fs.readFileSync(path.join(ROOT,"docs/data/biblia-explicata/nt-final-source-first",cfg.file),"utf8"))
  const baseline = JSON.parse(execFileSync("git",["cat-file","-p",cfg.baseline],{cwd:ROOT,encoding:"utf8",maxBuffer:20*1024*1024}))
  const currentUnits=new Map(); for(const ch of current.chapters??[]) for(const unit of ch.units??[]) currentUnits.set(unit.id,unit)
  const baselineUnits=new Map(); for(const ch of baseline.chapters??[]) for(const unit of ch.units??[]) baselineUnits.set(unit.id,unit)
  const map={}
  for (const [id,unit] of currentUnits) {
    const base=baselineUnits.get(id)
    const currentSha=sha(snap(unit)); const baselineSha=base?sha(snap(base)):null
    map[id]=currentSha
    console.log(`PRESEMANTIC_SNAPSHOT ${cfg.bookId} ${id} ${currentSha} baseline=${baselineSha} ${currentSha===baselineSha?'same':'DIFF'}`)
    if(base && currentSha!==baselineSha){
      console.log(`PRESEMANTIC_DIFF ${id} ${JSON.stringify({baseline:payload(base),current:payload(unit)})}`)
    }
  }
  console.log(`PRESEMANTIC_MAP ${cfg.bookId} ${JSON.stringify(map)}`)
}
