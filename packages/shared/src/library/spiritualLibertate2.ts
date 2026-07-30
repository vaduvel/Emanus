import type { Lesson } from "../domain.js"
import { SPIRITUAL_LIBERTATE_PART_A } from "./spiritualLibertate.js"

const lesson=(id:string,order:number,title:string,ref:string,verse:string,truth:string,step:string,prayer:string):Lesson=>({id,courseId:"spiritual_c4_libertate",order,title,estMinutes:14,anchorRefs:[ref],memoryVerseRef:ref,steps:[
{id:`${id}_1`,type:"hook",order:1,bubbles:[{from:"guide",text:truth}]},
{id:`${id}_2`,type:"scripture",order:2,scripture:{text:verse,ref}},
{id:`${id}_3`,type:"truth_simple",order:3,bubbles:[{from:"guide",text:step}]},
{id:`${id}_4`,type:"choice",order:4,choice:{prompt:"Unde ai nevoie de ajutor?",options:[{id:`${id}a`,label:"Să recunosc minciuna."},{id:`${id}b`,label:"Să mă împotrivesc fără frică."},{id:`${id}c`,label:"Să nu rămân singur."}]}},
{id:`${id}_5`,type:"step",order:5,bubbles:[{from:"guide",text:step}]},
{id:`${id}_6`,type:"prayer",order:6,bubbles:[{from:"guide",text:prayer}]},
{id:`${id}_7`,type:"memory_verse",order:7,scripture:{text:verse,ref}}
]})

export const libertateL4=lesson("spirit_libertate_l4",4,"Supune-te și împotrivește-te","Iacov 4:7","Supuneți-vă lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.","Ordinea contează: întâi supunere lui Dumnezeu, apoi împotrivire. Nu volumul, formula sau temperamentul dau autoritate, ci Iisus și adevărul Lui.","Numește minciuna, răspunde cu adevărul Scripturii, închide accesul practic și cere sprijin. Dacă există manifestări severe, nu confrunta singur.","«Mă supun lui Dumnezeu și refuz minciuna ___. Iisuse, păzește-mă și întărește-mă să rămân în adevăr.»")

export const libertateL5=lesson("spirit_libertate_l5",5,"Armura lui Dumnezeu","Efeseni 6:11","Îmbrăcați-vă cu toată armura lui Dumnezeu, ca să puteți ține piept împotriva uneltirilor diavolului.","Armura nu este costum imaginar activat prin incantație. Este viața în adevăr, dreptate, Evanghelia păcii, credință, mântuire, Cuvânt și rugăciune.","Alege piesa neglijată și transform-o în ascultare: spune adevărul, repară nedreptatea, caută pacea, ridică credința sau răspunde cu Scriptura.","«Doamne, așază-mă în adevărul, dreptatea, pacea, credința, mântuirea și Cuvântul Tău. Fă-mă treaz și statornic.»")

export const libertateL6:Lesson={
 id:"spirit_libertate_l6",courseId:"spiritual_c4_libertate",order:6,title:"Rugăciunea pentru eliberare",estMinutes:16,anchorRefs:["Luca 4:18","Coloseni 1:13","Iacov 4:7"],memoryVerseRef:"Coloseni 1:13",steps:[
  {id:"sli6_1",type:"hook",order:1,bubbles:[{from:"guide",text:"Eliberarea nu este spectacol și această aplicație nu este exorcist. Rugăciunea îl aduce pe om sub domnia lui Iisus, în adevăr, pocăință și sprijinul comunității."}]},
  {id:"sli6_2",type:"truth_simple",order:2,bubbles:[{from:"guide",text:"Înainte de rugăciune: asigură siguranța, cere consimțământul, nu filma, nu atinge fără acord, nu opri tratamentul și nu promite rezultatul. Pentru criză, violență sau auto-vătămare se cheamă 112."}]},
  {id:"sli6_3",type:"choice",order:3,choice:{prompt:"Cum parcurgi această rugăciune?",options:[{id:"sli6a",label:"Cu un lider matur și sigur."},{id:"sli6b",label:"Ca rugăciune personală de predare."},{id:"sli6c",label:"Încă nu sunt pregătit; caut ajutor."}]}},
  {id:"sli6_4",type:"step",order:4,bubbles:[{from:"guide",text:"Parcurge fără grabă: mărturisește credința în Iisus; numește păcatul real; renunță la practica și minciuna cunoscute; iartă fără a reveni în pericol; cere izbăvire; împotrivește-te celui rău; primește sprijin."}]},
  {id:"sli6_5",type:"prayer",order:5,bubbles:[{from:"guide",text:"«Doamne Iisuse, mă așez sub domnia Ta. Mărturisesc ___. Renunț la ___ și refuz minciuna ___. Îți cer să mă izbăvești de rău și să rupi orice lucrare a întunericului asupra mea. Umple-mi viața cu adevărul și Duhul Tău. Condu-mă în lumină și comunitate. Amin.»"}]},
  {id:"sli6_6",type:"how_god_helps",order:6,bubbles:[{from:"guide",text:"Limita cinstită: o rugăciune nu garantează o manifestare, o senzație sau încheierea imediată a tuturor simptomelor. Lipsa unei schimbări vizibile nu dovedește credință slabă ori păcat ascuns."}]},
  {id:"sli6_7",type:"memory_verse",order:7,scripture:{text:"El ne-a izbăvit de sub puterea întunericului.",ref:"Coloseni 1:13"}}
 ]
}

export const libertateL7=lesson("spirit_libertate_l7",7,"După eliberare: rămâi în lumină","Ioan 8:31-32","Dacă rămâneți în Cuvântul Meu, sunteți în adevăr ucenicii Mei; veți cunoaște adevărul, și adevărul vă va face slobozi.","Libertatea nu se întreține prin frica următorului atac, ci prin rămânerea în Iisus. Unele răni, obiceiuri și simptome au nevoie de îngrijire continuă chiar după o experiență spirituală reală.","Păstrează Scriptura, rugăciunea, comunitatea, limitele și tratamentul. Notează persoanele sigure și semnalele care cer ajutor. Nu transforma fiecare zi grea în dovada că eliberarea a eșuat.","«Iisuse, ține-mă în Cuvântul și comunitatea Ta. Vindecă ce necesită timp și păzește-mă de frică, izolare și întoarcerea la vechile practici.»")

export const SPIRITUAL_LIBERTATE_LESSONS:Lesson[]=[...SPIRITUAL_LIBERTATE_PART_A,libertateL4,libertateL5,libertateL6,libertateL7]
