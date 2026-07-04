-- Build the deploy-ready character cast: the accountant player + 44 townsfolk,
-- each as a static front (npc-<slug>.png / char-player.png) plus four 2-frame
-- idle strips (npc-<slug>-<dir>.png / char-player-<dir>.png). Chibi Stardew style.
local DIR = "C:/Users/rober/Documents/aat_app/tools/aseprite/"
local M = dofile(DIR.."chars.lua")
local L = dofile(DIR.."lib.lua")
local OUT = DIR.."out/"
local S,H,SH,C,T,F = M.SKIN,M.HAIR,M.SHIRT,M.CLOTH,M.TIE,M.FUR

-- chosen player (Option 4 — Cozy Scholar)
local PLAYER = {skin=S.light,hair=H.auburn,hairStyle="tousled",shirt=SH.cream,tie=T.green,
  tieStyle="straight",over={ramp=C.mustard,style="cardigan"},glasses="round",
  trouser=M.R("3a2616","55381f"),satchel=true}

local HUMANS = {
 {"banker",   {skin=S.light,hair=H.black,hairStyle="combed",shirt=SH.white,over={ramp=C.navy,style="blazer"},tie=T.gold,hat="tophat",beard="mustache",beardCol=H.black,prop="coins"}},
 {"auditor",  {skin=S.tan,hair=H.grey,hairStyle="combed",shirt=SH.blue,over={ramp=C.charcoal,style="blazer"},glasses="round",prop="magnifier"}},
 {"taxman",   {skin=S.light,hair=H.brown,hairStyle="combed",shirt=SH.white,over={ramp=C.teal,style="uniform"},hat="newsboy",prop="clipboard",tie=T.green}},
 {"trader",   {skin=S.brown,hair=H.black,hairStyle="bun",shirt=SH.pink,over={ramp=C.rust,style="apron"},hat="headscarf",prop="basket"}},
 {"librarian",{skin=S.light,hair=H.auburn,hairStyle="bun",shirt=SH.cream,over={ramp=C.green,style="cardigan"},glasses="round",prop="book"}},
 {"professor",{skin=S.light,hair=H.grey,hairStyle="long",shirt=SH.white,over={ramp=C.plum,style="robe"},beard="beardgrey",beardCol=H.grey,glasses="square",prop="book"}},
 {"blacksmith",{skin=S.brown,hair=H.black,hairStyle="undercut",shirt=SH.blue,over={ramp=C.brown,style="apron"},beard="full",beardCol=H.black,prop="hammer",sleevesRolled=true}},
 {"farmer",   {skin=S.tan,hair=H.ginger,hairStyle="tousled",shirt=SH.cream,over={ramp=C.navy,style="overalls"},hat="straw",prop="basket",beard="goatee",beardCol=H.ginger}},
 {"baker",    {skin=S.light,hair=H.brown,hairStyle="combed",shirt=SH.white,over={ramp=C.rust,style="apron"},hat="chef",prop="basket",apronStain=true}},
 {"guard",    {skin=S.deep,hair=H.black,hairStyle="undercut",shirt=SH.blue,over={ramp=C.charcoal,style="uniform"},hat="guard",prop="staff"}},
 {"mayor",    {skin=S.light,hair=H.grey,hairStyle="combed",shirt=SH.white,over={ramp=C.plum,style="blazer"},tie=T.gold,hat="mayor",beard="mustache",beardCol=H.grey,prop="ledger"}},
 {"scribe",   {skin=S.tan,hair=H.brown,hairStyle="ponytail",shirt=SH.cream,over={ramp=C.green,style="vest"},tie=T.green,glasses="round",prop="quillpen"}},
 {"treasurer",{skin=S.brown,hair=H.black,hairStyle="bald",shirt=SH.white,over={ramp=C.navy,style="vest"},tie=T.blue,prop="coins",beard="goatee",beardCol=H.black}},
 {"apprentice",{skin=S.light,hair=H.ginger,hairStyle="tousled",shirt=SH.blue,over={ramp=C.mustard,style="cardigan"},prop="book"}},
 {"wizard",   {skin=S.tan,hair=H.grey,hairStyle="long",shirt=SH.white,over={ramp=C.plum,style="robe"},hat="wizard",beard="full",beardCol=H.grey,prop="staff"}},
 {"courier",  {skin=S.tan,hair=H.brown,hairStyle="undercut",shirt=SH.blue,over={ramp=C.rust,style="uniform"},hat="newsboy",satchel=true,prop="clipboard"}},
 {"tealady",  {skin=S.light,hair=H.grey,hairStyle="bun",shirt=SH.pink,over={ramp=C.teal,style="apron"},hat="teapot",prop="teapot"}},
 {"lamplighter",{skin=S.deep,hair=H.grey,hairStyle="combed",shirt=SH.cream,over={ramp=C.charcoal,style="robe"},hat="flatcap",prop="lantern",beard="beardgrey",beardCol=H.grey}},
 {"painter",  {skin=S.light,hair=H.auburn,hairStyle="tousled",shirt=SH.white,over={ramp=C.teal,style="apron"},apronStain=true,prop="brush",hat="newsboy"}},
 {"bard",     {skin=S.tan,hair=H.auburn,hairStyle="long",shirt=SH.cream,over={ramp=C.green,style="dress"},prop="lute"}},
 {"herbalist",{skin=S.brown,hair=H.black,hairStyle="ponytail",shirt=SH.cream,over={ramp=C.green,style="apron"},hat="straw",prop="basket"}},
 {"clerk",    {skin=S.light,hair=H.brown,hairStyle="sidepart",shirt=SH.white,over={ramp=C.charcoal,style="vest"},tie=T.red,glasses="square",prop="ledger",visor=true}},
}
local ANIMALS = {
 {"owl_auditor",     {fur=F.brown,belly=F.cream,ears="tuft",muzzle="beak",beakCol=L.R.gold,glasses="round",acc="bowtie",accCol=L.R.redroof,prop="book",tail="none"}},
 {"fox_scribe",      {fur=F.fox,belly=F.cream,ears="pointy",muzzle="snout",tail="bushy",tailCol=F.fox,acc="vest",accCol=C.green,prop="quillpen"}},
 {"cat_merchant",    {fur=F.grey,belly=F.white,ears="pointy",muzzle="short",whiskers=true,tail="thin",acc="scarf",accCol=L.R.redroof,prop="coins"}},
 {"mole_clerk",      {fur=F.slate,belly=F.cream,ears="none",muzzle="snout",nose=L.hx("d6789a"),glasses="round",prop="lantern",tail="thin"}},
 {"rabbit_courier",  {fur=F.white,belly=F.white,ears="tall",muzzle="short",tail="none",acc="apron",accCol=C.rust,prop="clipboard"}},
 {"bear_smith",      {fur=F.brown,belly=F.tan,ears="round",muzzle="snout",acc="apron",accCol=C.brown,prop="hammer"}},
 {"penguin_banker",  {fur=F.black,belly=F.white,ears="none",muzzle="beak",beakCol=L.R.gold,acc="bowtie",accCol=C.navy,prop="coins",tail="none"}},
 {"mouse_keeper",    {fur=F.grey,belly=F.cream,ears="round",muzzle="short",whiskers=true,tail="thin",glasses="round",prop="ledger"}},
 {"tortoise_elder",  {fur=F.green,belly=F.sand,ears="none",muzzle="beak",beakCol=F.sand,shell=true,glasses="round",prop="book",tail="none"}},
 {"squirrel_saver",  {fur=F.ginger,belly=F.cream,ears="tuft",muzzle="short",tail="bushy",tailCol=F.ginger,acc="collar",prop="coins"}},
 {"raccoon_watch",   {fur=F.grey,belly=F.cream,ears="round",muzzle="snout",mask=true,tail="ring",tailCol=F.grey,prop="lantern"}},
 {"deer_ranger",     {fur=F.tan,belly=F.cream,ears="antlers",muzzle="snout",acc="scarf",accCol=C.green,tail="none"}},
 {"pig_farmer",      {fur=F.pink,belly=F.pink,ears="floppy",muzzle="snout",nose=L.hx("a85a6a"),hat="straw",acc="apron",accCol=C.navy,tail="none",prop="basket"}},
 {"sheep_weaver",    {fur=F.white,belly=F.white,wool=true,ears="floppy",muzzle="short",acc="scarf",accCol=C.teal,tail="none"}},
 {"beaver_builder",  {fur=F.brown,belly=F.tan,ears="round",muzzle="snout",tail="flat",acc="apron",accCol=C.mustard,prop="hammer"}},
 {"otter_fisher",    {fur=F.brown,belly=F.cream,ears="round",muzzle="short",whiskers=true,tail="thin",acc="collar",prop="basket"}},
 {"redpanda_trader", {fur=M.R("7a2e10","a8481a","d0702c"),belly=F.cream,inner=M.FUR.white[3],ears="pointy",muzzle="short",rpface=true,tail="ring",tailCol=M.R("7a2e10","a8481a","d0702c"),acc="scarf",accCol=C.teal,prop="coins"}},
 {"raven_ledger",    {fur=F.black,belly=F.slate,ears="none",muzzle="beak",beakCol=L.hx("6a6a76"),crest=true,sheen=L.hx("4a4a80"),wings=true,acc="collar",accCol=L.R.gold,prop="quillpen",tail="none"}},
 {"hedgehog_herb",   {fur=F.tan,belly=F.cream,ears="round",muzzle="snout",spikes=true,acc="apron",accCol=C.green,prop="basket",tail="none"}},
 {"badger_judge",    {fur=F.grey,belly=F.white,ears="round",muzzle="snout",stripes=M.FUR.white[3],acc="collar",accCol=L.R.gold,prop="book"}},
 {"frog_cashier",    {fur=F.green,belly=F.cream,ears="none",muzzle="none",acc="bowtie",accCol=L.R.redroof,prop="coins",tail="none"}},
 {"duck_clerk",      {fur=F.white,belly=F.white,ears="none",muzzle="beak",beakCol=L.R.gold,acc="apron",accCol=C.teal,prop="ledger",tail="none"}},
}

local DIRS = {"down","up","left","right"}
local function emit(builder, spec, base)
  local front = builder(spec,0,"down"); front:save(OUT..base..".png"); front:close()   -- static portrait/battle
  for _,dir in ipairs(DIRS) do
    local f0=builder(spec,0,dir); local f1=builder(spec,1,dir)
    local s=L.strip({f0,f1}); s:save(OUT..base.."-"..dir..".png"); s:close(); f0:close(); f1:close()
  end
end

emit(M.human, PLAYER, "char-player")
for _,e in ipairs(HUMANS)  do emit(M.human,  e[2], "npc-"..e[1]) end
for _,e in ipairs(ANIMALS) do emit(M.animal, e[2], "npc-"..e[1]) end
print("CAST_OK "..(1+#HUMANS+#ANIMALS).." characters")
