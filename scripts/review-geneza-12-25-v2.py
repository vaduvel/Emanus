#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "packages" / "shared" / "src" / "bible"

EDITS = {
"geneza12.ts": [
("Dumnezeu fagaduieste intotdeauna impotriva a ce se vede.", "Aici Dumnezeu fagaduieste in ciuda a ceea ce Avram vede in clipa aceea."),
("Ascultarea dusa numai pe jumatate isi cere pretul, chiar daca nu i se zice pacat.", "Textul nu spune ca luarea lui Lot a fost neascultare; legatura cu necazurile de mai tarziu ramane o lectura omiletica, nu verdictul naratorului."),
],
"geneza13.ts": [
("In cartea aceasta, cine merge spre rasarit se departeaza.", "In mai multe episoade timpurii ale Genezei, mersul spre rasarit insoteste departarea; aici este o legatura literara posibila, nu o regula pentru orice aparitie a directiei."),
("Dumnezeu vorbeste adesea dupa o pierdere primita cu mana deschisa.", "In aceasta scena, Dumnezeu vorbeste dupa despartirea pe care Avram a primit-o cu mana deschisa."),
],
"geneza14.ts": [
("Salemul este cetatea care se va numi mai tarziu Ierusalim", "Salemul este identificat de multi interpreti cu Ierusalimul de mai tarziu, desi Geneza nu face aici identificarea in mod explicit"),
("Numele acesta vine de la Eber, si radacina lui inseamna a trece dincolo. Este cel venit de peste Rau, strainul.", "Originea numelui este discutata: poate fi legata de Eber ori de radacina care inseamna a trece dincolo. Textul il numeste pe Avram «Evreul», fara sa explice aici etimologia."),
],
"geneza15.ts": [
("In lumea veche, un legamant se incheia taind dobitoace in doua si asezand bucatile fata in fata, iar cei doi care se legau treceau impreuna printre ele.", "Ieremia 34 arata ca trecerea printre animale despicate putea insoti un legamant si exprima judecata asupra celui necredincios. Nu stim ca fiecare legamant din lumea veche urma exact aceeasi ceremonie."),
("Prin trecerea aceea, Dumnezeu ia asupra Lui blestemul din amandoua partile. Se leaga si pentru partea Lui, si pentru partea omului. Ca si cum ar zice: daca Eu nu-Mi voi tine cuvantul, sa fiu facut ca dobitoacele acestea. Si daca tu nu ti-l vei tine — tot Eu.", "Faptul ca numai semnele prezentei lui Dumnezeu trec printre bucati subliniaza initiativa si angajamentul Lui. Legatura cu purtarea blestemului de catre Hristos este o talcuire crestina a scenei, nu o propozitie rostita in Geneza 15."),
],
"geneza16.ts": [
("De unde a venit ea in casa lor? Din Egipt. Din coborarea aceea in care Avram si-a dat nevasta si a primit oi, boi, magari, robi si roabe.", "Agar este egipteanca, iar Avram primise roabe in Egipt. Este posibil sa fi intrat atunci in casa lor, dar Geneza nu spune cand ori cum a ajuns la Sarai."),
("Iar durerea care iese de aici nu s-a stins nici pana astazi.", "Iar din hotararea aceasta ies dureri pe care naratiunea le va urmari in viata acestei familii."),
],
"geneza17.ts": [
("Si ia aminte la litera adaugata in numele lui: este litera care se aude si in Numele lui Dumnezeu. Ca si cum Dumnezeu si-ar fi pus o parte din Numele Sau in numele omului.", "Unii predicatori au vazut in litera adaugata o amintire a Numelui lui Dumnezeu. Textul nu da aceasta explicatie, iar asemanarea de sunet nu dovedeste singura sensul schimbarii."),
("Sunt legaminte dintr-o singura parte, in care Dumnezeu Se leaga singur si nu pune nici o conditie: legamantul cu Noe, cand curcubeul a fost pus pe nori fara sa i se ceara nimic omului, si legamantul acesta cu Avraam, cand prin dobitoacele despicate a trecut numai El. Astfel de legaminte nu se pot rupe, fiindca nu atarna de cel ce doarme.", "Deosebirea dintre legaminte neconditionate si legaminte cu obligatii poate ajuta lectura, dar nu trebuie simplificata: chiar aici Dumnezeu cere semnul taierii imprejur, in timp ce fagaduinta si initiativa legamantului raman ale Lui."),
],
"geneza18.ts": [
("Un om de nouazeci si noua de ani, taiat imprejur cu putine zile in urma, alearga in zaduf ca sa nu-i scape niste drumeti.", "Un om de nouazeci si noua de ani, taiat imprejur in episodul anterior, alearga in zaduf ca sa nu-i scape niste drumeti; textul nu precizeaza cate zile trecusera."),
("Tocmeala de la sfarsit, cu scaderea din numar, este chipul obisnuit al targului rasaritean — dar aici nu se tocmeste un pret, ci se cere mila.", "Coborarea treptata a numarului seamana cu o negociere, dar textul o prezinta ca mijlocire pentru mila, nu ne da o regula despre toate targurile rasaritene."),
],
"geneza19.ts": [
("Campia Iordanului era plina de smoala si de pucioasa, iar tinutul de la Marea Moarta poarta pana astazi urmele unei nimiciri.", "Geneza 14 pomeneste gropile de smoala din valea Sidim. Legarea unor urme arheologice ori geologice actuale de nimicirea povestita aici ramane discutata si nu este necesara explicatiei."),
("Poarta era locul unde se judecau pricinile si unde stateau fruntasii cetatii. Deci nu numai ca locuieste acolo; ajunsese cineva acolo.", "Poarta era loc de judecata si de invoieli. Sederea lui Lot acolo poate sugera o anumita pozitie publica, dar textul nu ii da o functie si nu spune ca era judecator."),
],
"geneza20.ts": [
("Gherarul era o cetate filisteana din tinutul de meazazi, iar Abimelec pare sa fie un titlu domnesc, nu doar un nume, fiindca il vom intalni si mai tarziu, in zilele lui Isaac.", "Gherarul este numit aici cetate filisteana din tinutul de meazazi. Reaparitia numelui Abimelec in zilele lui Isaac poate indica un nume dinastic ori un alt rege cu acelasi nume; textul nu hotaraste."),
("Daca Dumnezeu nu ar fi lucrat, s-ar fi putut pune la indoiala, pana la sfarsitul veacurilor, al cui este copilul fagaduintei.", "Dumnezeu a oprit apropierea lui Abimelec de Sara si a pazit familia prin care promisese ca va veni Isaac; textul nu spune mai mult despre consecintele ipotetice."),
],
"geneza21.ts": [
("Dupa legile lumii vechi, fiul intai nascut al unei roabe avea drept de mostenire daca stapanul il recunoscuse, dar putea fi slobozit din casa impreuna cu mama lui, pierzandu-si partea; de aceea cererea Sarei nu era numai o pornire, ci privea mostenirea.", "Unele texte juridice din lumea veche discuta mostenirea copiilor nascuti din roabe, dar obiceiurile nu erau uniforme. In Geneza, Sara spune explicit ca cererea ei priveste mostenirea."),
("Tamariscul este un pom care creste incet si traieste sute de ani, si nu-l sadeste decat cine socoteste sa ramana.", "Tamariscul poate creste incet si poate trai mult. Sadirea lui poate sugera stabilitate, dar textul nu spune ce durata avea in minte Avraam."),
],
"geneza22.ts": [
("drumul de la Beer-Seba pana acolo tine intr-adevar cam trei zile de mers.", "drumul dintre Beer-Seba si regiunea Ierusalimului poate fi parcurs in mai multe zile; textul spune doar ca Avraam a vazut locul a treia zi."),
("In timp ce un tata urca dealul cu inima grea, undeva se nastea si crestea fata prin care avea sa mearga mai departe fagaduinta.", "In timp ce povestirea il urmareste pe tata urcand dealul, Dumnezeu pregatise deja ramura familiei din care va veni Rebeca; lista nu ne spune cand s-a nascut ea."),
],
"geneza23.ts": [
("Tocmeala mergea totdeauna in acest chip: vanzatorul se ofera sa daruiasca lucrul, cumparatorul nu primeste, iar la urma se spune un pret foarte mare, dar rostit ca si cum ar fi un fleac.", "Schimbul de formule politicoase si oferta de dar pot reflecta conventii de negociere, dar nu putem spune ca fiecare tocmeala rasariteana urma intotdeauna exact acest tipar."),
("Patru sute de sicli de argint era o suma foarte mare, mult peste ce se dadea de obicei pe o bucata de ogor — mai tarziu, David va plati cincizeci de sicli pentru o arie, iar Ieremia saptesprezece pentru un ogor.", "Patru sute de sicli de argint este o suma mare. Preturile platite de David si Ieremia in alte epoci, pentru alte proprietati, nu sunt comparatii suficiente ca sa dovedim exact cu cat a fost supraplatit ogorul."),
],
"geneza24.ts": [
("Cel mai frumos slujitor din Geneza ramane fara nume. Isi face lucrarea si se sterge pe sine — asa cum face si Duhul Sfant, care nu vorbeste de la Sine, ci ia din ce este al Fiului si ne descopera noua.", "Slujitorul ramane fara nume si isi face lucrarea fara sa se puna pe sine in centru. Asemanarea cu lucrarea Duhului Sfant poate sluji ca imagine omiletica, dar naratorul nu il identifica pe slujitor cu Duhul."),
("Se cuvine sa invatam de aici cum se alege un om cu care sa-ti legi viata: nu dupa cum arata, ci dupa cum se poarta cu cel de la care nu are nimic de castigat.", "Fapta Rebecai scoate la lumina darnicia si harnicia ei. Scena poate forma discernamantul, dar nu ofera o metoda ori un semn universal pentru alegerea sotului sau sotiei."),
],
"geneza25.ts": [
("Sunt rani vechi in familii care nu se vindeca decat la un mormant. Si totusi se vindeca.", "Uneori un mormant ii aduce pe oameni din nou unul langa altul. Faptul ca Isaac si Ismael il ingroapa impreuna pe Avraam nu ne spune insa daca toate ranile dintre ei s-au vindecat."),
("Deci nu este vorba de mormant. Este cea dintai licarire din Scriptura ca moartea nu este sfarsit, ci o adunare.", "Expresia nu descrie simplu locul mormantului, fiindca Avraam este ingropat departe de stramosii lui. Unii vad aici o licarire a nadejdii dincolo de moarte; Geneza nu explica inca deplin ce inseamna «adaugat la poporul sau»."),
],
}

def main():
    count = 0
    for name, edits in EDITS.items():
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        for old, new in edits:
            n = text.count(old)
            if n != 1:
                raise SystemExit(f"{name}: expected one match, found {n}: {old[:80]}")
            text = text.replace(old, new)
            count += 1
        path.write_text(text, encoding="utf-8")
    if count != 28:
        raise SystemExit(f"expected 28 edits, got {count}")
    print(f"Applied {count} editorial corrections in {len(EDITS)} chapters.")

if __name__ == "__main__":
    main()
