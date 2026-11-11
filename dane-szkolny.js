/* Konkurs Tematyczny „W zdrowym ciele, zdrowy duch” 2026/2027 — ETAP SZKOLNY
   Zadania ćwiczeniowe ułożone wg Załącznika nr 2 (zakres wiedzy, etap szkolny, pkt 1–8).
   To NIE są oficjalne zadania konkursowe — konkurs odbywa się po raz pierwszy, arkuszy archiwalnych brak.
   t: numer tematu z zakresu wymagań (1–8)
   c: indeksy poprawnych odpowiedzi w oryginalnej kolejności o[]
   u: 1 = zadanie na umiejętności z części III zakresu (tabele, wykresy, schematy, teksty źródłowe)
   Dane liczbowe w ankietach i doświadczeniach są przykładowe (ułożone na potrzeby zadań).        */

/* ---------- pomocnicze: tabele, wykresy, schematy (renderowane w treści zadania) ---------- */
function TAB(head, rows){
  return `<div class="tw"><table><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>`+
    rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')+`</table></div>`;
}
function liczba(v, dec){ return (dec==null ? String(v) : v.toFixed(dec)).replace('.', ','); }
/* poziomy wykres słupkowy: dane = [[etykieta, wartość], ...] */
function SLUPKI(dane, o){
  const W=360, L=o.L||110, R=50, row=26, H=dane.length*row+(o.prog!=null?20:6);
  const sx = v => L + (W-L-R)*v/o.max;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.opis}" style="width:100%;max-width:${W}px;height:auto;font-size:12px">`;
  dane.forEach(([lab,v],i)=>{
    const y=i*row+4, w=sx(v)-L;
    s += `<text x="${L-6}" y="${y+13}" text-anchor="end" fill="currentColor">${lab}</text>`+
         `<rect x="${L}" y="${y}" width="${w.toFixed(1)}" height="18" rx="3" style="fill:var(--accent)"/>`+
         `<text x="${(L+w+5).toFixed(1)}" y="${y+13}" fill="currentColor">${liczba(v)}${o.jedn||''}</text>`;
  });
  if(o.prog!=null){
    const x=sx(o.prog).toFixed(1);
    s += `<line x1="${x}" x2="${x}" y1="0" y2="${dane.length*row+2}" stroke-dasharray="4 3" stroke-width="1.5" style="stroke:var(--bad)"/>`+
         `<text x="${x}" y="${H-3}" text-anchor="middle" style="fill:var(--bad)">${o.progOpis||''}</text>`;
  }
  return s + '</svg>';
}
/* wykres liniowy: pkt = [[etykieta osi X, wartość], ...] */
function LINIA(pkt, o){
  const W=360, H=220, L=52, R=14, T=18, B=40, iw=W-L-R, ih=H-T-B;
  const pad = 20;   // odsunięcie skrajnych punktów od osi, żeby etykiety się nie nakładały
  const x = i => L + pad + i*(iw-2*pad)/(pkt.length-1);
  const y = v => T + ih*(o.max-v)/(o.max-o.min);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.opis}" style="width:100%;max-width:${W}px;height:auto;font-size:11px">`;
  for(let v=o.min; v<=o.max+1e-9; v+=o.krok){
    const yy=y(v).toFixed(1);
    s += `<line x1="${L}" x2="${W-R}" y1="${yy}" y2="${yy}" style="stroke:var(--line)"/>`+
         `<text x="${L-5}" y="${+yy+4}" text-anchor="end" fill="currentColor">${liczba(v,o.dec)}</text>`;
  }
  if(o.prog!=null){
    const yy=y(o.prog).toFixed(1);
    s += `<line x1="${L}" x2="${W-R}" y1="${yy}" y2="${yy}" stroke-dasharray="5 4" stroke-width="1.5" style="stroke:var(--bad)"/>`;
  }
  s += `<polyline fill="none" stroke-width="2" style="stroke:var(--accent)" points="${pkt.map((p,i)=>x(i).toFixed(1)+','+y(p[1]).toFixed(1)).join(' ')}"/>`;
  pkt.forEach((p,i)=>{
    const cx=x(i).toFixed(1), cy=y(p[1]).toFixed(1);
    s += `<circle cx="${cx}" cy="${cy}" r="3.5" style="fill:var(--accent)"/>`+
         `<text x="${cx}" y="${cy-7}" text-anchor="middle" fill="currentColor" font-weight="600">${liczba(p[1],o.dec)}</text>`+
         `<text x="${cx}" y="${H-B+15}" text-anchor="middle" fill="currentColor">${p[0]}</text>`;
  });
  if(o.osX) s += `<text x="${L+iw/2}" y="${H-5}" text-anchor="middle" fill="currentColor">${o.osX}</text>`;
  if(o.osY) s += `<text x="11" y="${T+ih/2}" text-anchor="middle" fill="currentColor" transform="rotate(-90 11 ${T+ih/2})">${o.osY}</text>`;
  return s + '</svg>';
}
/* schemat łańcucha przyczyn i skutków; '?' oznacza lukę */
function SCHEMAT(kroki){
  return `<div class="chain">`+kroki.map(k=>k==='?'?`<span class="gap">?</span>`:`<span>${k}</span>`).join('<b>→</b>')+`</div>`;
}

const D_SZKOLNY = [

/* ============ 1. Pojęcie zdrowia i zdrowego stylu życia ============ */
{n:"1.1", t:1,
 q:"Zgodnie z definicją Światowej Organizacji Zdrowia (WHO) zdrowie to:",
 o:["brak choroby lub niedomagania",
    "stan pełnego dobrostanu fizycznego, psychicznego i społecznego, a nie wyłącznie brak choroby lub niedomagania",
    "dobra sprawność fizyczna i prawidłowa masa ciała",
    "zdolność do wykonywania pracy zawodowej"], c:[1],
 x:"Definicja z Konstytucji WHO (1948) podkreśla trzy wymiary zdrowia: fizyczny, psychiczny i społeczny."},

{n:"1.2", t:1,
 q:"Które z poniższych przykładów dotyczą zdrowia społecznego?",
 o:["umiejętność nawiązywania i utrzymywania relacji z innymi ludźmi",
    "prawidłowe ciśnienie krwi",
    "umiejętność współpracy w grupie i proszenia o pomoc",
    "umiejętność radzenia sobie ze stresem"], c:[0,2],
 x:"Radzenie sobie ze stresem zalicza się do zdrowia psychicznego, ciśnienie krwi — do fizycznego."},

{n:"1.3", t:1,
 w:"Według koncepcji M. Lalonde’a na zdrowie człowieka wpływają cztery grupy czynników: styl życia, środowisko fizyczne i społeczne, czynniki biologiczne (genetyczne) oraz opieka zdrowotna.",
 q:"Która grupa czynników ma według tej koncepcji największy wpływ na zdrowie?",
 o:["opieka zdrowotna","czynniki genetyczne","styl życia","środowisko fizyczne"], c:[2],
 x:"Styl życia odpowiada za około połowę wpływu na zdrowie — i jest czynnikiem, który w dużej mierze sami kontrolujemy."},

{n:"1.4", t:1,
 q:"Na który z czynników wpływających na zdrowie człowiek ma najmniejszy wpływ?",
 o:["sposób odżywiania","aktywność fizyczna","czynniki genetyczne","ilość snu"], c:[2]},

{n:"1.5", t:1,
 q:"Które zachowania należą do zdrowego stylu życia?",
 o:["regularna aktywność fizyczna",
    "spanie 5 godzin w dni szkolne i odsypianie w weekend",
    "spożywanie posiłków o stałych porach",
    "ograniczanie czasu przed ekranem"], c:[0,2,3],
 x:"Nieregularny sen i „odsypianie” zaburzają rytm dobowy; nastolatki potrzebują ok. 8–10 godzin snu każdej nocy."},

{n:"1.6", t:1,
 q:"Ile wynosi zalecana przez WHO minimalna dzienna dawka umiarkowanej lub intensywnej aktywności fizycznej dla dzieci i młodzieży w wieku 5–17 lat?",
 o:["15 minut","30 minut","średnio 60 minut","3 godziny"], c:[2],
 x:"WHO zaleca średnio co najmniej 60 minut dziennie, a ćwiczenia intensywne i wzmacniające mięśnie — co najmniej 3 razy w tygodniu."},

{n:"1.7", t:1,
 q:"Ile godzin snu na dobę zaleca się nastolatkom w wieku 13–18 lat?",
 o:["5–6 godzin","6–7 godzin","8–10 godzin","12–14 godzin"], c:[2],
 x:"Dzieci w wieku 6–12 lat potrzebują 9–12 godzin, nastolatki 13–18 lat — 8–10 godzin snu."},

{n:"1.8", t:1,
 q:"Promocja zdrowia to przede wszystkim:",
 o:["leczenie chorób w szpitalu",
    "proces umożliwiający ludziom zwiększenie kontroli nad własnym zdrowiem i jego poprawę",
    "reklama leków bez recepty",
    "wyłącznie szczepienia ochronne"], c:[1],
 x:"Tak definiuje promocję zdrowia Karta Ottawska (WHO, 1986)."},

{n:"1.9", t:1,
 q:"Które z poniższych stwierdzeń dotyczących zdrowia są prawdziwe?",
 o:["Zdrowie jest wartością, którą można kształtować przez własne wybory.",
    "Zdrowie psychiczne nie ma wpływu na zdrowie fizyczne.",
    "Zdrowie jest zasobem umożliwiającym realizację planów życiowych.",
    "O zdrowiu decydują wyłącznie lekarze."], c:[0,2],
 x:"Zdrowie psychiczne i fizyczne wzajemnie na siebie wpływają, np. przewlekły stres zwiększa ryzyko chorób serca."},

{n:"1.10", t:1,
 q:"Samokontrola zdrowia (samoobserwacja) obejmuje m.in.:",
 o:["regularne mierzenie masy ciała i wzrostu",
    "obserwowanie znamion na skórze",
    "samodzielne stawianie diagnozy i przyjmowanie antybiotyków",
    "zwracanie uwagi na niepokojące objawy i zgłaszanie ich dorosłym lub lekarzowi"], c:[0,1,3],
 x:"Samokontrola nie zastępuje lekarza; antybiotyki przyjmuje się wyłącznie z przepisu lekarza."},

/* ============ 2. Czynniki wpływające na zdrowie i samopoczucie ============ */
{n:"2.1", t:2,
 q:"Które z poniższych czynników wpływają negatywnie na zdrowie?",
 o:["bierne palenie tytoniu","przewlekły stres","regularny sen","hałas"], c:[0,1,3]},

{n:"2.2", t:2,
 q:"Wskaż czynniki chroniące (pozytywnie wpływające na zdrowie psychiczne) nastolatka.",
 o:["wsparcie rodziny i przyjaciół",
    "rozwijanie zainteresowań",
    "ciągłe porównywanie się z innymi w mediach społecznościowych",
    "regularna aktywność fizyczna"], c:[0,1,3],
 x:"Porównywanie się z wyidealizowanymi wizerunkami w mediach społecznościowych obniża samoocenę i nastrój."},

{n:"2.3", t:2,
 q:"Korzystanie z ekranu (telefonu, tabletu) bezpośrednio przed snem utrudnia zasypianie, ponieważ niebieskie światło:",
 o:["zwiększa wydzielanie melatoniny","hamuje wydzielanie melatoniny","obniża temperaturę ciała","zwiększa wydzielanie insuliny"], c:[1],
 x:"Melatonina to hormon regulujący rytm snu i czuwania; jej wydzielanie rośnie w ciemności."},

{n:"2.4", t:2,
 q:"Które objawy mogą świadczyć o długotrwałym (przewlekłym) stresie?",
 o:["problemy ze snem","bóle głowy i brzucha","drażliwość i trudności z koncentracją","poprawa odporności"], c:[0,1,2],
 x:"Przewlekły stres osłabia odporność."},

{n:"2.5", t:2,
 q:"Podczas aktywności fizycznej w organizmie wydzielają się endorfiny. Jaki jest ich główny wpływ na samopoczucie?",
 o:["wywołują senność","poprawiają nastrój i zmniejszają odczuwanie bólu","zwiększają uczucie głodu","podwyższają ciśnienie krwi na stałe"], c:[1]},

{n:"2.6", t:2,
 q:"Które z poniższych sposobów radzenia sobie ze stresem są konstruktywne (zdrowe)?",
 o:["rozmowa z zaufaną osobą","ćwiczenia oddechowe i relaksacyjne","sięganie po napoje energetyczne","planowanie nauki i dzielenie zadań na mniejsze części"], c:[0,1,3]},

{n:"2.7", t:2,
 q:"Które z czynników środowiskowych szkodzą zdrowiu?",
 o:["smog (zanieczyszczenie powietrza pyłami PM10 i PM2,5)","nadmierne promieniowanie UV","dostęp do terenów zielonych","hałas komunikacyjny"], c:[0,1,3]},

{n:"2.8", t:2,
 w:"Uczeń zapisywał przez tydzień czas spędzony przed ekranem (poza nauką): pn 3 h, wt 4 h, śr 2 h, czw 5 h, pt 4 h, sob 6 h, nd 4 h.",
 q:"Ile wynosi średni dzienny czas przed ekranem tego ucznia?",
 o:["3 h","4 h","4,5 h","28 h"], c:[1],
 x:"Suma = 28 h, 28 h : 7 dni = 4 h dziennie. 28 h to łączny czas w tygodniu, a nie średnia."},

{n:"2.9", t:2,
 q:"Siedzący tryb życia zwiększa ryzyko:",
 o:["nadwagi i otyłości","wad postawy","chorób układu krążenia","nadmiernego rozrostu mięśni"], c:[0,1,2],
 x:"Brak ruchu sprzyja raczej osłabieniu mięśni i kości."},

{n:"2.10", t:2,
 q:"Bierne palenie oznacza:",
 o:["palenie e-papierosów","wdychanie dymu tytoniowego przez osoby niepalące przebywające w pobliżu palących","palenie mniej niż 5 papierosów dziennie","żucie tytoniu"], c:[1],
 x:"Dym tytoniowy zawiera kilka tysięcy substancji chemicznych, w tym kilkadziesiąt rakotwórczych — szkodzi także osobom niepalącym."},

/* ============ 3. Higiena osobista ============ */
{n:"3.1", t:3,
 q:"Jak długo, zgodnie z zaleceniami, należy myć ręce mydłem, aby skutecznie usunąć drobnoustroje?",
 o:["ok. 5 sekund","co najmniej 20–30 sekund","dokładnie 2 minuty","wystarczy opłukać ręce wodą"], c:[1],
 x:"Należy umyć wewnętrzne i zewnętrzne powierzchnie dłoni, przestrzenie między palcami, kciuki i paznokcie."},

{n:"3.2", t:3,
 q:"W których sytuacjach należy obowiązkowo umyć ręce?",
 o:["po skorzystaniu z toalety","przed jedzeniem","po kontakcie ze zwierzęciem","po umyciu zębów"], c:[0,1,2]},

{n:"3.3", t:3,
 q:"Wskaż prawidłowe zasady higieny jamy ustnej.",
 o:["mycie zębów co najmniej 2 razy dziennie przez ok. 2 minuty",
    "używanie pasty z fluorem",
    "wymiana szczoteczki co ok. 3 miesiące",
    "mycie zębów od razu po wypiciu soku z cytrusów, gdy szkliwo jest zmiękczone"], c:[0,1,2],
 x:"Po kwaśnych napojach lepiej odczekać ok. 30 minut i przepłukać usta wodą — szczotkowanie zmiękczonego szkliwa sprzyja jego ścieraniu."},

{n:"3.4", t:3,
 q:"Fluor w paście do zębów:",
 o:["wybiela zęby","wzmacnia szkliwo i chroni przed próchnicą","usuwa kamień nazębny","zabija wszystkie bakterie w jamie ustnej"], c:[1]},

{n:"3.5", t:3,
 q:"Nieprzyjemny zapach potu powstaje głównie w wyniku:",
 o:["dużej zawartości soli w pocie","rozkładu składników potu przez bakterie na skórze","picia zbyt dużej ilości wody","wydzielania łoju przez gruczoły łojowe"], c:[1],
 x:"Świeży pot jest prawie bezwonny. Zapach powstaje, gdy bakterie bytujące na skórze rozkładają jego składniki."},

{n:"3.6", t:3,
 q:"Czym różni się antyperspirant od dezodorantu?",
 o:["Antyperspirant ogranicza wydzielanie potu, dezodorant neutralizuje lub maskuje zapach.",
    "Dezodorant ogranicza wydzielanie potu, antyperspirant tylko pachnie.",
    "Nie ma między nimi różnicy.",
    "Antyperspirant stosuje się wyłącznie na stopy."], c:[0]},

{n:"3.7", t:3,
 q:"Jak należy prawidłowo stosować krem z filtrem UV podczas pobytu na słońcu?",
 o:["nakładać ok. 15–30 minut przed wyjściem na słońce",
    "ponawiać aplikację co ok. 2 godziny oraz po kąpieli",
    "stosować tylko w pochmurne dni",
    "unikać słońca w godzinach największego nasłonecznienia (ok. 11–15)"], c:[0,1,3],
 x:"Promieniowanie UV przenika przez chmury, więc ochrona jest potrzebna również w pochmurne dni."},

{n:"3.8", t:3,
 q:"Dlaczego nie zaleca się czyszczenia uszu patyczkami higienicznymi wkładanymi do przewodu słuchowego?",
 o:["mogą wepchnąć woskowinę głębiej i uszkodzić błonę bębenkową",
    "patyczki zawierają szkodliwe substancje",
    "woskowina jest zbędna i należy ją usuwać codziennie z wnętrza ucha",
    "patyczki powodują zapalenie spojówek"], c:[0],
 x:"Woskowina chroni przewód słuchowy; myje się tylko małżowinę i ujście przewodu."},

{n:"3.9", t:3,
 q:"Które zachowania zmniejszają ryzyko grzybicy stóp?",
 o:["dokładne osuszanie stóp, także między palcami","noszenie klapek na basenie","pożyczanie butów sportowych od kolegów","noszenie przewiewnego obuwia i bawełnianych skarpet"], c:[0,1,3]},

{n:"3.10", t:3,
 q:"Jak należy postępować ze zmianami trądzikowymi na skórze?",
 o:["wyciskać wszystkie krosty","myć twarz delikatnymi preparatami i nie wyciskać zmian","przy nasilonym trądziku skonsultować się z lekarzem dermatologiem","smarować twarz tłustymi kremami, aby wysuszyć zmiany"], c:[1,2],
 x:"Wyciskanie zmian sprzyja zakażeniom i powstawaniu blizn."},

{n:"3.11", t:3,
 q:"Zasłanianie ust i nosa przy kichaniu (najlepiej chusteczką jednorazową lub zgięciem łokcia) ogranicza przenoszenie zakażeń drogą:",
 o:["pokarmową","kropelkową","przez ukąszenie owadów","płciową"], c:[1]},

/* ============ 4. Zasady zdrowego żywienia ============ */
{n:"4.1", t:4,
 w:"Talerz Zdrowego Żywienia (Narodowe Centrum Edukacji Żywieniowej) pokazuje proporcje grup produktów w codziennej diecie.",
 q:"Która grupa produktów powinna zajmować około połowy talerza?",
 o:["produkty zbożowe","warzywa i owoce (z przewagą warzyw)","mięso, ryby i jaja","nabiał"], c:[1],
 x:"Pozostałą część talerza zajmują produkty zbożowe pełnoziarniste (ok. ¼) oraz produkty białkowe (ok. ¼); do tego woda i tłuszcze roślinne."},

{n:"4.2", t:4,
 q:"Ile kilokalorii (kcal) dostarcza 1 g tłuszczu?",
 o:["4 kcal","7 kcal","9 kcal","12 kcal"], c:[2],
 x:"1 g białka i 1 g węglowodanów to ok. 4 kcal, 1 g tłuszczu — ok. 9 kcal."},

{n:"4.3", t:4,
 w:"Porcja płatków śniadaniowych zawiera: 4 g białka, 30 g węglowodanów, 2 g tłuszczu.",
 q:"Ile kilokalorii dostarcza ta porcja (przyjmij: białko i węglowodany 4 kcal/g, tłuszcz 9 kcal/g)?",
 o:["36 kcal","154 kcal","170 kcal","306 kcal"], c:[1],
 x:"4·4 + 30·4 + 2·9 = 16 + 120 + 18 = 154 kcal."},

{n:"4.4", t:4,
 q:"Które pierwiastki należą do makroelementów?",
 o:["wapń","żelazo","magnez","jod"], c:[0,2],
 x:"Żelazo i jod to mikroelementy — organizm potrzebuje ich w bardzo małych ilościach."},

{n:"4.5", t:4,
 q:"Które pierwiastki należą do mikroelementów?",
 o:["cynk","fosfor","fluor","potas"], c:[0,2],
 x:"Fosfor i potas to makroelementy."},

{n:"4.6", t:4,
 w:"1) wapń   2) żelazo   3) jod\na) niedokrwistość (anemia)   b) wole tarczycy   c) osłabienie kości, krzywica, osteoporoza",
 q:"Przyporządkuj pierwiastkom skutki ich niedoboru.",
 o:["1-c; 2-a; 3-b","1-a; 2-b; 3-c","1-b; 2-a; 3-c","1-c; 2-b; 3-a"], c:[0]},

{n:"4.7", t:4,
 q:"Ile posiłków dziennie zaleca się uczniom i w jakich odstępach?",
 o:["1–2 duże posiłki","4–5 posiłków co ok. 3–4 godziny","8–10 małych przekąsek","3 posiłki, w tym obfita kolacja tuż przed snem"], c:[1],
 x:"Regularne posiłki zapobiegają spadkom koncentracji i podjadaniu; kolację warto zjeść ok. 2–3 godziny przed snem."},

{n:"4.8", t:4,
 q:"Dlaczego śniadanie jest ważnym posiłkiem dla ucznia?",
 o:["dostarcza energii po nocnej przerwie w jedzeniu","poprawia koncentrację i zdolność uczenia się","całkowicie zastępuje drugie śniadanie","pozwala pominąć obiad"], c:[0,1]},

{n:"4.9", t:4,
 q:"Wskaż produkty, które są dobrym źródłem błonnika pokarmowego.",
 o:["kasza gryczana i pieczywo pełnoziarniste","warzywa strączkowe","biały ryż i bułki pszenne","surowe warzywa i owoce"], c:[0,1,3],
 x:"Produkty rafinowane (biały ryż, jasne pieczywo) zawierają niewiele błonnika."},

{n:"4.10", t:4,
 q:"WHO zaleca ograniczenie spożycia soli kuchennej u dorosłych do:",
 o:["mniej niż 5 g dziennie (ok. 1 płaska łyżeczka)","15 g dziennie","30 g dziennie","sól nie ma wpływu na zdrowie"], c:[0],
 x:"Nadmiar soli zwiększa ryzyko nadciśnienia tętniczego. Dużo soli „ukrytej” jest w pieczywie, wędlinach, serach i przekąskach."},

{n:"4.11", t:4,
 q:"Witaminy rozpuszczalne w tłuszczach to:",
 o:["A, D, E, K","B₁, B₂, B₆, B₁₂","C i kwas foliowy","wszystkie witaminy"], c:[0],
 x:"Witaminy A, D, E, K mogą gromadzić się w organizmie, dlatego łatwiej je przedawkować."},

{n:"4.12", t:4,
 q:"Suplementację witaminy D zaleca się w Polsce szczególnie w miesiącach od września do kwietnia, ponieważ:",
 o:["w tym okresie jemy mniej mięsa",
    "w naszej szerokości geograficznej synteza witaminy D w skórze pod wpływem słońca jest wtedy niewystarczająca",
    "witamina D jest potrzebna tylko zimą",
    "zimą wzrasta zapotrzebowanie na kalorie"], c:[1]},

{n:"4.13", t:4,
 q:"Witamina C ułatwia wchłanianie z pożywienia:",
 o:["wapnia","żelaza","jodu","fluoru"], c:[1],
 x:"Dlatego do produktów bogatych w żelazo (np. strączków) warto dodać warzywa lub owoce bogate w witaminę C."},

{n:"4.14", t:4,
 q:"Który napój najlepiej gasi pragnienie i powinien być podstawowym napojem w ciągu dnia?",
 o:["woda","sok owocowy","napój gazowany słodzony","napój izotoniczny"], c:[0]},

{n:"4.15", t:4,
 q:"Które stwierdzenia dotyczące suplementacji są prawdziwe?",
 o:["Suplementy diety są środkami spożywczymi, a nie lekami.",
    "Zbilansowana dieta zazwyczaj dostarcza większości potrzebnych składników.",
    "Suplementy zawsze są bezpieczne, bo są „naturalne”.",
    "Decyzję o suplementacji najlepiej podjąć po konsultacji z lekarzem lub farmaceutą."], c:[0,1,3]},

{n:"4.16", t:4,
 q:"Główną funkcją białek w organizmie jest funkcja:",
 o:["budulcowa","wyłącznie zapasowa","barwnikowa","izolacyjna"], c:[0],
 x:"Białka budują tkanki, enzymy, przeciwciała i niektóre hormony; głównym źródłem energii są węglowodany."},

{n:"4.17", t:4,
 q:"Który składnik pokarmowy powinien dostarczać największej części energii w zbilansowanej diecie ucznia?",
 o:["węglowodany (ok. 45–65% energii)","tłuszcze (ok. 70% energii)","białka (ok. 50% energii)","witaminy"], c:[0],
 x:"Orientacyjnie: węglowodany ok. 45–65%, tłuszcze ok. 20–35%, białka ok. 10–20% energii. Witaminy nie dostarczają energii."},

{n:"4.18", t:4,
 w:"Porcja płatków śniadaniowych dostarcza 154 kcal, w tym: z białka 16 kcal, z węglowodanów 120 kcal, z tłuszczu 18 kcal.",
 q:"Jaki procent energii tej porcji pochodzi z węglowodanów (w zaokrągleniu do całości)?",
 o:["ok. 12%","ok. 50%","ok. 78%","ok. 120%"], c:[2],
 x:"120 : 154 · 100% ≈ 77,9% ≈ 78%."},

/* ============ 5. Skutki nieprawidłowych diet, nadmiaru suplementów, napojów energetycznych ============ */
{n:"5.1", t:5,
 q:"Jakie skutki mogą wywołać diety bardzo niskokaloryczne i jednoskładnikowe (monodiety) u nastolatków?",
 o:["niedobory witamin i składników mineralnych","efekt jo-jo","przyspieszenie wzrostu","zaburzenia miesiączkowania u dziewcząt"], c:[0,1,3]},

{n:"5.2", t:5,
 q:"Efekt jo-jo to:",
 o:["szybki powrót do poprzedniej masy ciała (lub jej przekroczenie) po zakończeniu restrykcyjnej diety",
    "stała, powolna utrata masy ciała",
    "nagły wzrost apetytu po wysiłku fizycznym",
    "wahania nastroju po spożyciu cukru"], c:[0]},

{n:"5.3", t:5,
 q:"Nadmierne przyjmowanie witaminy A może prowadzić do:",
 o:["uszkodzenia wątroby","poprawy widzenia w nocy u każdego","bólów głowy i nudności","szybszego gojenia ran bez skutków ubocznych"], c:[0,2],
 x:"Witamina A rozpuszcza się w tłuszczach i gromadzi w wątrobie — jej nadmiar jest toksyczny."},

{n:"5.4", t:5,
 q:"Dlaczego przyjmowanie kilku różnych suplementów jednocześnie może być niebezpieczne?",
 o:["mogą zawierać te same składniki, co grozi przedawkowaniem","mogą wchodzić w interakcje z lekami","suplementy wzajemnie się neutralizują i zawsze są bezużyteczne","jest to niebezpieczne tylko dla osób starszych"], c:[0,1]},

{n:"5.5", t:5,
 q:"Od 1 stycznia 2024 r. w Polsce obowiązuje zakaz sprzedaży napojów energetycznych osobom:",
 o:["poniżej 12 lat","poniżej 16 lat","poniżej 18 lat","zakaz dotyczy tylko sprzedaży na terenie szkół"], c:[2],
 x:"Zakaz obejmuje napoje z dodatkiem kofeiny powyżej 150 mg/l lub tauryny; dotyczy też sprzedaży w automatach i w szkołach."},

{n:"5.6", t:5,
 q:"Jakie skutki może wywołać spożywanie napojów energetycznych przez nastolatki?",
 o:["kołatanie serca i wzrost ciśnienia krwi","bezsenność i rozdrażnienie","trwała poprawa wyników w nauce","nadmierne spożycie cukru i ryzyko próchnicy"], c:[0,1,3]},

{n:"5.7", t:5,
 w:"Napój energetyczny zawiera 32 mg kofeiny w 100 ml. Uczeń wypił puszkę o pojemności 500 ml.",
 q:"Ile kofeiny przyjął uczeń?",
 o:["32 mg","80 mg","160 mg","320 mg"], c:[2],
 x:"32 mg × 5 = 160 mg."},

{n:"5.8", t:5,
 w:"Europejski Urząd ds. Bezpieczeństwa Żywności (EFSA) przyjmuje, że dla dzieci i młodzieży bezpieczna dzienna dawka kofeiny to 3 mg na 1 kg masy ciała.",
 q:"Jaka jest bezpieczna dzienna dawka kofeiny dla ucznia o masie 45 kg?",
 o:["45 mg","90 mg","135 mg","300 mg"], c:[2],
 x:"3 mg × 45 = 135 mg. Jedna puszka 500 ml napoju z poprzedniego zadania (160 mg) przekracza ten limit."},

{n:"5.9", t:5,
 q:"Które składniki są typowe dla napojów energetycznych?",
 o:["kofeina","tauryna","duża ilość cukru lub słodzików","wapń w ilości pokrywającej dzienne zapotrzebowanie"], c:[0,1,2]},

{n:"5.10", t:5,
 q:"Zaburzenie odżywiania polegające na celowym, drastycznym ograniczaniu jedzenia i lęku przed przytyciem mimo niedowagi to:",
 o:["bulimia","anoreksja (jadłowstręt psychiczny)","otyłość","celiakia"], c:[1],
 x:"Bulimia to napady objadania się, po których następują zachowania kompensacyjne (np. prowokowanie wymiotów). Celiakia to nietolerancja glutenu o podłożu autoimmunologicznym."},

{n:"5.11", t:5,
 q:"Które sygnały mogą świadczyć o zaburzeniach odżywiania u kolegi lub koleżanki?",
 o:["omijanie posiłków i ukrywanie jedzenia","ciągłe liczenie kalorii i obsesja na punkcie wagi","szybki spadek masy ciała","jedzenie śniadania z rodziną"], c:[0,1,2],
 x:"W takiej sytuacji warto porozmawiać z zaufanym dorosłym, np. pedagogiem lub psychologiem szkolnym."},

{n:"5.12", t:5,
 q:"Słodzone napoje gazowane spożywane regularnie zwiększają ryzyko:",
 o:["próchnicy zębów","nadwagi","erozji szkliwa (z powodu kwasowości)","niedoboru cukru we krwi"], c:[0,1,2]},

/* ============ 6. Rozpoznawanie objawów chorobowych ============ */
{n:"6.1", t:6,
 w:"Mężczyzna skarży się na silny, uciskający ból za mostkiem promieniujący do lewej ręki i żuchwy. Jest blady, spocony, ma duszność.",
 q:"Objawy te mogą świadczyć o:",
 o:["zawale serca","zatruciu pokarmowym","zapaleniu wyrostka robaczkowego","migrenie"], c:[0],
 x:"Należy natychmiast wezwać pomoc (112 lub 999), posadzić poszkodowanego w wygodnej pozycji i ograniczyć jego wysiłek."},

{n:"6.2", t:6,
 w:"Uczeń skarży się na ból brzucha, który zaczął się wokół pępka, a po kilku godzinach przeniósł się w prawy dolny róg brzucha. Ma nudności i podwyższoną temperaturę.",
 q:"Objawy te są typowe dla:",
 o:["zgagi","zapalenia wyrostka robaczkowego","zapalenia ucha","przeziębienia"], c:[1],
 x:"Zapalenie wyrostka wymaga pilnej konsultacji lekarskiej. Do czasu badania nie podaje się na własną rękę leków przeczyszczających ani nie przykłada ciepłego okładu na brzuch."},

{n:"6.3", t:6,
 w:"Do szybkiego rozpoznawania udaru mózgu służy test FAST (ang. Face — twarz, Arms — ręce, Speech — mowa, Time — czas).",
 q:"Które objawy mogą świadczyć o udarze mózgu?",
 o:["opadnięcie kącika ust (asymetria twarzy)","nagłe osłabienie lub drętwienie ręki po jednej stronie ciała","nagłe zaburzenia mowy","swędzące bąble na skórze"], c:[0,1,2],
 x:"„Time” oznacza, że trzeba natychmiast wezwać pomoc (112 lub 999) — w udarze liczy się każda minuta. Warto zapamiętać godzinę wystąpienia objawów."},

{n:"6.4", t:6,
 q:"Czarny, smolisty stolec (niezwiązany z przyjmowaniem preparatów żelaza ani np. jagód) może świadczyć o:",
 o:["krwawieniu z górnego odcinka przewodu pokarmowego (np. żołądka)","nadmiarze błonnika w diecie","prawidłowym trawieniu","przeziębieniu"], c:[0],
 x:"Świeża, jasnoczerwona krew w stolcu wskazuje częściej na krwawienie z dolnego odcinka przewodu pokarmowego. Każda krew w stolcu wymaga konsultacji z lekarzem."},

{n:"6.5", t:6,
 q:"Przy ocenie znamion na skórze stosuje się regułę ABCDE. Które cechy znamienia są niepokojące i wymagają konsultacji z dermatologiem?",
 o:["asymetria kształtu","nieregularne, poszarpane brzegi","jednolity jasnobrązowy kolor","powiększanie się lub zmiana wyglądu znamienia"], c:[0,1,3],
 x:"A — asymetria, B — brzegi, C — kolor (niejednolity), D — średnica powyżej 6 mm, E — ewolucja (zmiana)."},

{n:"6.6", t:6,
 w:"U dziecka z wysoką gorączką pojawiła się drobna, ciemnoczerwona wysypka. Po przyciśnięciu do niej szklanki plamki nie bledną.",
 q:"Jak należy postąpić?",
 o:["poczekać do następnego dnia","natychmiast wezwać pomoc medyczną — może to być objaw sepsy (posocznicy) meningokokowej","posmarować wysypkę kremem","podać lek przeciwhistaminowy i obserwować"], c:[1],
 x:"Wysypka niebledniejąca pod naciskiem szklanki to sygnał alarmowy — w sepsie liczy się każda godzina."},

{n:"6.7", t:6,
 q:"Które objawy mogą świadczyć o odwodnieniu, np. po wymiotach lub biegunce?",
 o:["suchość w ustach","rzadkie oddawanie małej ilości ciemnego moczu","osłabienie, senność, zawroty głowy","nadmierne pocenie się w chłodnym pomieszczeniu"], c:[0,1,2]},

{n:"6.8", t:6,
 q:"Jak należy nawadniać osobę, która wymiotuje?",
 o:["podawać małe porcje płynu (np. doustny płyn nawadniający) często, łyżeczką lub małymi łykami","jednorazowo wypić 1 litr wody","podawać słodkie napoje gazowane","nie podawać żadnych płynów przez dobę"], c:[0]},

{n:"6.9", t:6,
 q:"Bąble na skórze przypominające oparzenie pokrzywą, silnie swędzące, pojawiające się nagle np. po zjedzeniu orzeszków, to objaw:",
 o:["pokrzywki (reakcji alergicznej)","ospy wietrznej","trądziku","oparzenia słonecznego"], c:[0],
 x:"Jeśli towarzyszy im obrzęk twarzy, ust lub duszność — może to być wstrząs anafilaktyczny; należy natychmiast wezwać pomoc."},

{n:"6.10", t:6,
 q:"Które bóle głowy wymagają pilnej pomocy medycznej?",
 o:["nagły, bardzo silny ból głowy („najsilniejszy w życiu”)","ból głowy z gorączką, sztywnością karku i wymiotami","ból głowy po urazie głowy z zaburzeniami świadomości","lekki ból głowy po długiej nauce, ustępujący po odpoczynku"], c:[0,1,2],
 x:"Sztywność karku z gorączką może świadczyć o zapaleniu opon mózgowo-rdzeniowych."},

{n:"6.11", t:6,
 q:"Czerwona, owalna zmiana skórna, która kilka dni po ukąszeniu przez kleszcza pojawia się wokół jego miejsca i stopniowo się powiększa (często z jaśniejszym środkiem), to:",
 o:["rumień wędrujący — objaw boreliozy","oparzenie","pokrzywka","trądzik"], c:[0],
 x:"Rumień wędrujący pojawia się zwykle od kilku dni do ok. miesiąca po ukąszeniu i ma średnicę co najmniej 5 cm. Nie zawsze ma jaśniejszy środek. Wymaga wizyty u lekarza. Małe zaczerwienienie tuż po ukąszeniu, które szybko znika, to zwykle tylko miejscowe podrażnienie."},

{n:"6.12", t:6,
 q:"Które objawy są typowe dla zatrucia pokarmowego?",
 o:["nudności i wymioty","biegunka","kurczowe bóle brzucha","ból promieniujący do lewej ręki"], c:[0,1,2]},

{n:"6.13", t:6,
 q:"W których sytuacjach wymioty wymagają pilnej pomocy medycznej?",
 o:["wymioty po urazie głowy","wymioty z krwią lub treścią przypominającą fusy od kawy","wymioty z silnym bólem brzucha i twardym, bolesnym przy dotyku brzuchem","jednorazowe wymioty po zjedzeniu zbyt obfitego posiłku, po których samopoczucie się poprawia"], c:[0,1,2],
 x:"Wymioty po urazie głowy mogą świadczyć o wstrząśnieniu mózgu lub krwawieniu wewnątrzczaszkowym. Fusowate wymioty to objaw krwawienia z górnego odcinka przewodu pokarmowego."},

{n:"6.14", t:6,
 q:"Które przyczyny mogą zmienić kolor stolca, choć NIE doszło do krwawienia?",
 o:["zjedzenie buraków (zabarwienie czerwonawe)","przyjmowanie preparatów żelaza (zabarwienie ciemne, prawie czarne)","przyjęcie węgla leczniczego (zabarwienie czarne)","krwawiący wrzód żołądka"], c:[0,1,2],
 x:"Jeśli zmiana koloru nie ma takiego wyjaśnienia albo towarzyszą jej ból, osłabienie lub bladość — trzeba zgłosić się do lekarza."},

/* ============ 7. Gorączka i jej rola ============ */
{n:"7.1", t:7,
 q:"Od jakiej temperatury ciała (mierzonej pod pachą) mówimy zwykle o gorączce?",
 o:["od 36,6°C","od 37,0°C","powyżej 38°C","dopiero od 40°C"], c:[2],
 x:"Temperatura 37–38°C to stan podgorączkowy."},

{n:"7.2", t:7,
 q:"Która część mózgu pełni rolę „termostatu” organizmu i reguluje temperaturę ciała?",
 o:["móżdżek","podwzgórze","rdzeń przedłużony","kora ruchowa"], c:[1]},

{n:"7.3", t:7,
 q:"Jaka jest rola gorączki w organizmie?",
 o:["utrudnia namnażanie się wielu bakterii i wirusów","pobudza działanie układu odpornościowego","zawsze jest objawem groźnej choroby","jest reakcją obronną organizmu na zakażenie"], c:[0,1,3]},

{n:"7.4", t:7,
 w:"Substancje wywołujące gorączkę (pirogeny) powodują przestawienie „termostatu” w podwzgórzu na wyższą temperaturę.",
 q:"Dlaczego na początku gorączki odczuwamy dreszcze i zimno?",
 o:["organizm wytwarza ciepło (drżenie mięśni) i ogranicza jego utratę, aby osiągnąć nową, wyższą temperaturę","temperatura ciała gwałtownie spada","pocimy się zbyt mocno","jest to objaw odwodnienia"], c:[0],
 x:"Gdy gorączka ustępuje, „termostat” wraca do normy — organizm oddaje ciepło, pojawia się pocenie."},

{n:"7.5", t:7,
 q:"Którego leku przeciwgorączkowego NIE należy podawać dzieciom poniżej 12. roku życia bez zalecenia lekarza?",
 o:["paracetamolu","ibuprofenu","kwasu acetylosalicylowego (aspiryny)","żadnego z nich nie wolno podawać"], c:[2],
 x:"Kwas acetylosalicylowy może u dzieci wywołać groźny zespół Reye’a (uszkodzenie wątroby i mózgu)."},

{n:"7.6", t:7,
 q:"W których sytuacjach gorączka wymaga konsultacji lekarskiej?",
 o:["gorączka u niemowlęcia poniżej 3. miesiąca życia","gorączka trwająca dłużej niż 3 dni","gorączka z drgawkami, sztywnością karku lub niebledniejącą wysypką","stan podgorączkowy przez kilka godzin u zdrowego nastolatka w dobrym samopoczuciu"], c:[0,1,2]},

{n:"7.7", t:7,
 q:"Które działania pomagają osobie z gorączką?",
 o:["picie dużej ilości płynów","odpoczynek","okrywanie grubymi kocami mimo wysokiej temperatury","przewiewne ubranie i przewietrzone pomieszczenie"], c:[0,1,3],
 x:"Przykrywanie grubymi kocami utrudnia oddawanie ciepła."},

{n:"7.8", t:7,
 q:"Czym różni się gorączka od przegrzania organizmu (udaru cieplnego)?",
 o:["Przy gorączce organizm sam „podnosi” ustawienie termostatu; przy przegrzaniu temperatura rośnie, bo organizm nie nadąża z oddawaniem ciepła.",
    "Niczym się nie różnią.",
    "Przegrzanie jest zawsze wywołane przez bakterie.",
    "Gorączka występuje tylko latem."], c:[0]},

{n:"7.9", t:7,
 w:"Pomiary temperatury chorego ucznia: godz. 8:00 — 38,4°C; 12:00 — 39,1°C; 16:00 (po podaniu leku) — 37,8°C; 20:00 — 38,6°C.",
 q:"Które wnioski wynikają z tych danych?",
 o:["Najwyższą temperaturę zmierzono o 12:00.","O 16:00 uczeń miał stan podgorączkowy.","Gorączka całkowicie ustąpiła po podaniu leku.","Między 8:00 a 12:00 temperatura wzrosła o 0,7°C."], c:[0,1,3],
 x:"O 20:00 temperatura znów przekroczyła 38°C — lek obniża gorączkę, ale nie usuwa jej przyczyny."},

{n:"7.10", t:7,
 q:"Temperatura ciała powyżej ok. 41–42°C jest groźna dla życia, ponieważ:",
 o:["dochodzi do uszkodzenia (denaturacji) białek, w tym enzymów","organizm przestaje produkować krew","zatrzymuje się trawienie tłuszczów","zwiększa się produkcja witaminy D"], c:[0]},

{n:"7.11", t:7,
 q:"Jaki jest główny cel podawania leków przeciwgorączkowych?",
 o:["poprawa samopoczucia i komfortu chorego","obniżenie temperatury zawsze dokładnie do 36,6°C","wyleczenie przyczyny gorączki (np. zakażenia)","zapobieganie każdej, nawet niewielkiej gorączce"], c:[0],
 x:"Gorączka jest reakcją obronną, więc nie trzeba obniżać każdej podwyższonej temperatury. Leki przeciwgorączkowe łagodzą objawy, ale nie leczą przyczyny choroby."},

/* ============ 8. Pierwsza pomoc ============ */
{n:"8.1", t:8,
 q:"Co jest pierwszym krokiem przy udzielaniu pierwszej pomocy?",
 o:["sprawdzenie, czy poszkodowany oddycha","ocena bezpieczeństwa miejsca zdarzenia","rozpoczęcie uciśnięć klatki piersiowej","podanie poszkodowanemu wody"], c:[1],
 x:"Ratownik nie może narażać siebie — najpierw sprawdza, czy miejsce zdarzenia jest bezpieczne."},

{n:"8.2", t:8,
 q:"Jaki jest jednolity europejski numer alarmowy?",
 o:["997","998","112","911"], c:[2],
 x:"999 to numer pogotowia ratunkowego, 998 — straży pożarnej, 997 — policji."},

{n:"8.3", t:8,
 q:"Jak długo, zgodnie z wytycznymi, należy oceniać oddech u nieprzytomnego poszkodowanego (patrz, słuchaj, wyczuwaj)?",
 o:["do 10 sekund","1 minutę","3 minuty","nie ocenia się oddechu"], c:[0]},

{n:"8.4", t:8,
 q:"Jaki jest stosunek uciśnięć klatki piersiowej do oddechów ratowniczych w resuscytacji krążeniowo-oddechowej (RKO) dorosłego?",
 o:["15:2","30:2","5:1","50:5"], c:[1]},

{n:"8.5", t:8,
 q:"Wskaż prawidłowe parametry uciśnięć klatki piersiowej u dorosłego.",
 o:["głębokość 5–6 cm","tempo 100–120 uciśnięć na minutę","uciskanie środka klatki piersiowej (dolnej połowy mostka)","głębokość 1–2 cm"], c:[0,1,2]},

{n:"8.6", t:8,
 q:"W jakiej sytuacji układa się poszkodowanego w pozycji bocznej ustalonej (bezpiecznej)?",
 o:["gdy jest nieprzytomny, ale prawidłowo oddycha","gdy nie oddycha","gdy ma złamaną nogę i jest przytomny","przy każdym urazie kręgosłupa"], c:[0],
 x:"Pozycja boczna ustalona chroni drogi oddechowe przed zachłyśnięciem się np. wymiocinami. Osobie, która nie oddycha, rozpoczynamy RKO."},

{n:"8.7", t:8,
 q:"Do czego służy AED?",
 o:["do pomiaru ciśnienia krwi","do automatycznej analizy rytmu serca i wykonania defibrylacji","do podawania tlenu","do unieruchamiania złamań"], c:[1],
 x:"AED (automatyczny defibrylator zewnętrzny) wydaje polecenia głosowe — może go użyć każdy, także osoba bez przeszkolenia."},

{n:"8.8", t:8,
 q:"Kolega zakrztusił się kęsem jedzenia, nie może mówić ani kaszleć, chwyta się za szyję. Jak należy postąpić?",
 o:["wykonać do 5 uderzeń między łopatki, a następnie do 5 uciśnięć nadbrzusza (rękoczyn Heimlicha)","podać mu wodę do picia","położyć go na plecach i czekać","zachęcać tylko do kaszlu"], c:[0],
 x:"Do kaszlu zachęca się, gdy kaszel jest skuteczny. Gdy poszkodowany straci przytomność — wzywamy pomoc i rozpoczynamy RKO."},

{n:"8.9", t:8,
 q:"Jak należy postępować przy oparzeniu termicznym (np. gorącą wodą)?",
 o:["jak najszybciej chłodzić oparzone miejsce chłodną (nie lodowatą) bieżącą wodą przez ok. 20 minut","posmarować oparzenie masłem lub tłuszczem","przebić powstałe pęcherze","zdjąć biżuterię z okolicy oparzenia, zanim pojawi się obrzęk"], c:[0,3],
 x:"Wytyczne ERC 2021 zalecają chłodzenie przez co najmniej 20 minut (w starszych materiałach: 10–20 minut); nie przykłada się lodu. Nie przebija się pęcherzy i nie odrywa ubrania przyklejonego do skóry; oparzenie można osłonić jałowym opatrunkiem."},

{n:"8.10", t:8,
 q:"Jak postępować przy krwawieniu z nosa?",
 o:["usiąść, pochylić głowę do przodu i ucisnąć miękką część nosa (skrzydełka) przez ok. 10–15 minut","odchylić głowę do tyłu","co kilka minut mocno wydmuchiwać nos","położyć poszkodowanego płasko na plecach"], c:[0],
 x:"Odchylanie głowy do tyłu powoduje spływanie krwi do gardła, co może wywołać wymioty lub zachłyśnięcie. Jeśli krwawienie nie ustaje po ok. 20 minutach lub jest bardzo obfite — trzeba wezwać pomoc."},

{n:"8.11", t:8,
 q:"Jak należy zatamować silne krwawienie z rany kończyny?",
 o:["ucisnąć bezpośrednio ranę, np. jałowym opatrunkiem","założyć opatrunek uciskowy","usuwać z rany głęboko wbite ciało obce","założyć rękawiczki ochronne, jeśli są dostępne"], c:[0,1,3],
 x:"Ciał obcych wbitych głęboko w ranę nie usuwa się — stabilizuje się je opatrunkiem."},

{n:"8.12", t:8,
 q:"Przy podejrzeniu złamania kości przedramienia unieruchamia się:",
 o:["tylko miejsce złamania","dwa sąsiednie stawy (nadgarstek i łokieć)","całe ciało","nie unieruchamia się kończyny"], c:[1],
 x:"Zasada: przy złamaniu kości — unieruchamiamy dwa sąsiednie stawy; przy urazie stawu — dwie sąsiednie kości."},

{n:"8.13", t:8,
 q:"Jak należy postąpić z osobą, która ma napad drgawek (np. padaczkowy)?",
 o:["zabezpieczyć jej głowę przed urazem i usunąć niebezpieczne przedmioty","włożyć jej coś do ust, aby nie przygryzła języka","przytrzymywać siłą kończyny","po ustaniu drgawek, jeśli oddycha, ułożyć ją w pozycji bocznej ustalonej"], c:[0,3],
 x:"Pomoc wzywamy m.in. gdy drgawki trwają dłużej niż 5 minut, powtarzają się lub doszło do urazu."},

{n:"8.14", t:8,
 q:"Koleżanka z cukrzycą jest blada, spocona, drżą jej ręce, jest przytomna. Podejrzewasz niedocukrzenie (hipoglikemię). Co należy zrobić?",
 o:["podać jej słodki napój lub kostkę cukru","podać insulinę","kazać jej pobiegać","nic nie robić i poczekać"], c:[0],
 x:"Podanie cukru osobie przytomnej szybko podnosi poziom glukozy we krwi. Osobie nieprzytomnej nie podaje się niczego doustnie."},

{n:"8.15", t:8,
 q:"Po użądleniu przez pszczołę u ucznia pojawił się obrzęk twarzy i ust, chrypka i duszność. Jakie działania są właściwe?",
 o:["natychmiast wezwać pomoc (112)","jeśli uczeń ma przy sobie autowstrzykiwacz z adrenaliną — pomóc mu go użyć","podać mu ciepły napój i położyć spać","obserwować go przez kilka godzin bez wzywania pomocy"], c:[0,1],
 x:"To objawy wstrząsu anafilaktycznego — stanu bezpośredniego zagrożenia życia."},

{n:"8.16", t:8,
 q:"Jakie informacje należy przekazać dyspozytorowi podczas zgłoszenia na numer alarmowy?",
 o:["co się stało i gdzie (dokładny adres)","ilu jest poszkodowanych i w jakim są stanie","swoje imię i nazwisko oraz numer telefonu","swoją ocenę ze sprawdzianu z biologii"], c:[0,1,2],
 x:"Nie rozłączamy się pierwsi — dyspozytor może zadać dodatkowe pytania i udzielić instrukcji."},

{n:"8.17", t:8,
 w:"Ratownik wykonuje uciśnięcia klatki piersiowej w tempie 110 na minutę.",
 q:"Ile mniej więcej czasu zajmie mu wykonanie 30 uciśnięć?",
 o:["ok. 8 s","ok. 16 s","ok. 30 s","ok. 1 min"], c:[1],
 x:"60 s : 110 ≈ 0,55 s na uciśnięcie; 30 × 0,55 s ≈ 16 s."},

{n:"8.18", t:8,
 q:"Jak udrożnić drogi oddechowe u nieprzytomnego poszkodowanego leżącego na plecach?",
 o:["odchylić głowę do tyłu i unieść żuchwę","pochylić głowę do przodu, na klatkę piersiową","włożyć palce głęboko do gardła","podłożyć wysoką poduszkę pod głowę"], c:[0],
 x:"U nieprzytomnego język może opaść i zablokować drogi oddechowe — odchylenie głowy z uniesieniem żuchwy temu zapobiega."},

{n:"8.19", t:8,
 q:"Uczeń leży nieruchomo, dotykając uszkodzonego przewodu elektrycznego. Co należy zrobić najpierw?",
 o:["odłączyć zasilanie (wyłączyć prąd), nie dotykając poszkodowanego","natychmiast chwycić poszkodowanego za rękę i odciągnąć go","polać poszkodowanego wodą","rozpocząć uciśnięcia klatki piersiowej, nie zważając na przewód"], c:[0],
 x:"Dotknięcie osoby pod napięciem grozi porażeniem ratownika. Pomoc udziela się dopiero, gdy miejsce jest bezpieczne."},

{n:"8.20", t:8,
 q:"Które zasady dotyczą prawidłowego użycia AED podczas resuscytacji?",
 o:["należy wykonywać uciśnięcia klatki piersiowej do czasu przyniesienia i włączenia AED","podczas analizy rytmu serca i wyładowania nikt nie może dotykać poszkodowanego","elektrody nakleja się na odsłoniętą klatkę piersiową zgodnie z rysunkiem na elektrodach","po wyładowaniu należy zaczekać 5 minut przed wznowieniem uciśnięć"], c:[0,1,2],
 x:"Po wyładowaniu (lub gdy AED go nie zaleca) natychmiast wznawia się uciśnięcia i postępuje według poleceń urządzenia."},

/* ============ Zadania na umiejętności (część III zakresu): tabele, wykresy, schematy, teksty ============ */

{n:"1.11", t:1, u:1,
 w:"Diagram przedstawia udział czterech grup czynników w kształtowaniu zdrowia człowieka (wg koncepcji M. Lalonde’a)."+
   SLUPKI([["Styl życia",53],["Środowisko",21],["Czynniki genetyczne",16],["Opieka zdrowotna",10]],
          {max:60, jedn:"%", L:140, opis:"Udział czynników wpływających na zdrowie"}),
 q:"Które wnioski wynikają z diagramu?",
 o:["Styl życia wpływa na zdrowie ponad 5 razy silniej niż opieka zdrowotna.",
    "Opieka zdrowotna ma największy wpływ na zdrowie.",
    "Styl życia i środowisko łącznie odpowiadają za około trzy czwarte wpływu na zdrowie.",
    "Czynniki genetyczne mają większy wpływ na zdrowie niż środowisko."], c:[0,2],
 x:"53% : 10% = 5,3; 53% + 21% = 74% ≈ ¾. Czynniki genetyczne (16%) mają mniejszy udział niż środowisko (21%)."},

{n:"2.11", t:2, u:1,
 w:"Wykres przedstawia czas snu 13-letniego ucznia w kolejnych dniach tygodnia. Przerywana linia oznacza dolną granicę zalecanego czasu snu dla nastolatków (8 h)."+
   SLUPKI([["poniedziałek",6.5],["wtorek",7],["środa",6],["czwartek",6.5],["piątek",7],["sobota",10],["niedziela",10.5]],
          {max:12, jedn:" h", L:92, prog:8, progOpis:"8 h", opis:"Czas snu ucznia w dniach tygodnia"}),
 q:"Które stwierdzenia są zgodne z danymi z wykresu?",
 o:["W dni szkolne (poniedziałek–piątek) uczeń śpi krócej, niż zaleca się nastolatkom.",
    "Średni czas snu ucznia w dni szkolne wynosi 6,6 h.",
    "W weekend uczeń śpi wyraźnie dłużej niż w dni szkolne — „odsypia” niedobór snu.",
    "Uczeń śpi zgodnie z zaleceniami przez cały tydzień."], c:[0,1,2],
 x:"(6,5 + 7 + 6 + 6,5 + 7) : 5 = 33 : 5 = 6,6 h. „Odsypianie” w weekend nie wyrównuje skutków niedoboru snu i rozregulowuje rytm dobowy."},

{n:"2.12", t:2, u:1,
 w:"Schemat przedstawia łańcuch przyczyn i skutków. Jedno ogniwo zastąpiono znakiem zapytania."+
   SCHEMAT(["Korzystanie z telefonu w łóżku do późnej nocy","?","Za krótki sen","Senność i trudności z koncentracją na lekcjach"]),
 q:"Które sformułowanie należy wpisać w miejsce znaku zapytania?",
 o:["Zahamowanie wydzielania melatoniny przez niebieskie światło ekranu i opóźnione zasypianie",
    "Zwiększone wydzielanie melatoniny i szybkie zasypianie",
    "Spadek temperatury ciała poniżej 35°C",
    "Wzrost poziomu witaminy D we krwi"], c:[0]},

{n:"3.12", t:3, u:1,
 w:"Uczniowie przeprowadzili doświadczenie. Każda osoba odcisnęła palce na pożywce w szalce Petriego, ale ręce przygotowano w różny sposób. Szalki przez 3 dni trzymano w tej samej temperaturze, a potem policzono kolonie drobnoustrojów."+
   TAB(["Próba","Przygotowanie rąk","Liczba kolonii"],
       [["A","ręce niemyte","120"],["B","ręce opłukane samą wodą przez 5 s","85"],["C","ręce umyte wodą z mydłem przez 30 s","12"]]),
 q:"Które wnioski są poprawne?",
 o:["Mycie rąk mydłem przez 30 s zmniejszyło liczbę kolonii 10-krotnie w porównaniu z rękami niemytymi.",
    "Opłukanie rąk samą wodą usunęło większość drobnoustrojów.",
    "Próba A pełniła w doświadczeniu rolę próby kontrolnej.",
    "Doświadczenie dowodzi, że mydło zabija wszystkie drobnoustroje."], c:[0,2],
 x:"120 : 12 = 10. Po opłukaniu wodą zostało 85 ze 120 kolonii, czyli ok. 70% — usunięto mniejszość. W próbie C nadal wyrosło 12 kolonii, więc nie wszystkie drobnoustroje zostały usunięte."},

{n:"4.19", t:4, u:1,
 w:"W tabeli podano wartość odżywczą dwóch jogurtów (w 100 g produktu)."+
   TAB(["Składnik (w 100 g)","Jogurt naturalny","Jogurt owocowy"],
       [["Wartość energetyczna","61 kcal","98 kcal"],["Białko","4,3 g","3,2 g"],["Węglowodany, w tym cukry","4,7 g","13,5 g"],["Tłuszcz","3,0 g","2,6 g"],["Wapń","150 mg","110 mg"]]),
 q:"Które wnioski wynikają z danych w tabeli?",
 o:["Jogurt owocowy zawiera prawie 3 razy więcej cukrów niż naturalny.",
    "Jogurt naturalny dostarcza więcej białka niż owocowy.",
    "Jogurt owocowy jest lepszym źródłem wapnia niż naturalny.",
    "Kubek jogurtu owocowego (150 g) dostarcza ok. 20 g cukrów."], c:[0,1,3],
 x:"13,5 : 4,7 ≈ 2,9; 13,5 g × 1,5 ≈ 20 g. Jogurt naturalny zawiera więcej wapnia (150 mg)."},

{n:"4.20", t:4, u:1,
 w:"Diagram pokazuje, jaki procent energii z jednodniowego jadłospisu ucznia pochodzi z poszczególnych makroskładników. Zalecenia: węglowodany 45–65%, tłuszcze 20–35%, białka 10–20% energii."+
   SLUPKI([["Węglowodany",40],["Tłuszcze",45],["Białka",15]], {max:70, jedn:"%", L:100, opis:"Udział makroskładników w energii jadłospisu"}),
 q:"Które stwierdzenia dotyczące tego jadłospisu są prawdziwe?",
 o:["Z tłuszczów pochodzi więcej energii, niż się zaleca.",
    "Z węglowodanów pochodzi mniej energii, niż się zaleca.",
    "Udział białek mieści się w zalecanym zakresie.",
    "Jadłospis jest prawidłowo zbilansowany."], c:[0,1,2]},

{n:"4.21", t:4, u:1,
 w:"Uczeń zapisał w dzienniczku wszystko, co zjadł i wypił w ciągu jednego dnia. Spać poszedł o 22:00."+
   TAB(["Godzina","Co zjadł / wypił"],
       [["6:45","szklanka słodzonej herbaty"],["10:00","drożdżówka, słodzony napój gazowany"],["14:30","zupa pomidorowa, kotlet schabowy, ziemniaki"],["17:00","paczka chipsów"],["21:45","trzy kanapki z wędliną"]]),
 q:"Które błędy żywieniowe popełnił uczeń?",
 o:["brak pełnowartościowego śniadania","spożycie kolacji tuż przed snem","brak warzyw i owoców w całym jadłospisie","zbyt długa przerwa między obiadem a podwieczorkiem"], c:[0,1,2],
 x:"Między obiadem (14:30) a podwieczorkiem (17:00) minęło 2,5 h — to prawidłowy odstęp. Błędem był natomiast sam wybór podwieczorku (chipsy) i słodkie napoje."},

{n:"5.13", t:5, u:1,
 w:"W pewnej szkole przeprowadzono anonimową ankietę. Diagram pokazuje, jaki odsetek uczniów z każdego rocznika pije napoje energetyczne co najmniej raz w tygodniu."+
   SLUPKI([["klasa 5",8],["klasa 6",14],["klasa 7",22],["klasa 8",31]], {max:50, jedn:"%", L:70, opis:"Odsetek uczniów pijących napoje energetyczne"}),
 q:"Które wnioski wynikają z diagramu?",
 o:["Odsetek uczniów pijących napoje energetyczne rośnie w starszych klasach.",
    "W klasie 8 prawie co trzeci uczeń pije napoje energetyczne co najmniej raz w tygodniu.",
    "W klasie 7 odsetek ten jest dokładnie dwa razy większy niż w klasie 5.",
    "Większość uczniów klasy 8 pije napoje energetyczne co tydzień."], c:[0,1],
 x:"31% ≈ ⅓. 22% : 8% = 2,75, a nie 2. 31% to mniej niż połowa, więc nie jest to większość."},

{n:"5.14", t:5, u:1,
 w:"Tabela przedstawia przybliżoną zawartość kofeiny w wybranych produktach. Bezpieczna dzienna dawka kofeiny dla dzieci i młodzieży wynosi 3 mg na 1 kg masy ciała."+
   TAB(["Produkt","Porcja","Kofeina"],
       [["napój energetyczny","puszka 250 ml","80 mg"],["napój typu cola","puszka 330 ml","32 mg"],["kawa","filiżanka 200 ml","90 mg"],["herbata czarna","szklanka 200 ml","45 mg"],["czekolada gorzka","50 g","25 mg"]]),
 q:"Które zestawy spożyte w ciągu jednego dnia przekraczają bezpieczną dawkę kofeiny dla ucznia o masie 40 kg?",
 o:["napój energetyczny + cola","napój energetyczny + herbata","dwie puszki coli + czekolada gorzka","kawa + herbata"], c:[1,3],
 x:"Limit: 3 mg × 40 = 120 mg. Energetyk + cola = 112 mg; energetyk + herbata = 125 mg; 2 cole + czekolada = 89 mg; kawa + herbata = 135 mg."},

{n:"6.15", t:6, u:1,
 w:"W tabeli opisano objawy trzech osób."+
   TAB(["Osoba","Objawy"],
       [["1","silny, uciskający ból w klatce piersiowej od 20 minut, duszność, zimny pot"],["2","katar, lekki ból gardła, temperatura 37,2°C, dobre samopoczucie"],["3","gorączka 39,5°C, sztywność karku, wysypka, która nie blednie pod naciskiem szklanki"]]),
 q:"Które osoby wymagają natychmiastowego wezwania pomocy (112 lub 999)?",
 o:["osoba 1","osoba 2","osoba 3","żadna z nich"], c:[0,2],
 x:"Osoba 1 — możliwy zawał serca; osoba 3 — możliwe zapalenie opon mózgowo-rdzeniowych i sepsa. Objawy osoby 2 wskazują na przeziębienie."},

{n:"7.12", t:7, u:1,
 w:"Wykres przedstawia temperaturę ciała ucznia mierzoną przez 4 dni choroby rano (r, 8:00) i wieczorem (w, 20:00). Przerywana linia oznacza 38°C."+
   LINIA([["1 r",36.8],["1 w",38.9],["2 r",38.2],["2 w",39.4],["3 r",37.9],["3 w",38.3],["4 r",36.9],["4 w",36.7]],
         {min:36.5, max:40, krok:0.5, dec:1, prog:38, osX:"dzień choroby i pora pomiaru", osY:"°C", opis:"Temperatura ciała ucznia w kolejnych dniach choroby"}),
 q:"Które stwierdzenia są zgodne z wykresem?",
 o:["Najwyższą temperaturę zmierzono wieczorem 2. dnia.",
    "W dniach 1–3 temperatura wieczorem była wyższa niż rano tego samego dnia.",
    "W 4. dniu temperatura ciała ucznia była prawidłowa.",
    "Gorączka trwała dłużej niż 4 dni."], c:[0,1,2],
 x:"Wieczorny wzrost temperatury jest typowy dla gorączki. W 4. dniu pomiary (36,9°C i 36,7°C) mieszczą się w normie."},

{n:"7.13", t:7, u:1,
 w:"Wykres przedstawia temperaturę ciała ucznia mierzoną przez 4 dni choroby rano (r, 8:00) i wieczorem (w, 20:00). Przerywana linia oznacza 38°C."+
   LINIA([["1 r",36.8],["1 w",38.9],["2 r",38.2],["2 w",39.4],["3 r",37.9],["3 w",38.3],["4 r",36.9],["4 w",36.7]],
         {min:36.5, max:40, krok:0.5, dec:1, prog:38, osX:"dzień choroby i pora pomiaru", osY:"°C", opis:"Temperatura ciała ucznia w kolejnych dniach choroby"}),
 q:"W ilu pomiarach temperatura przekroczyła 38°C (gorączka)?",
 o:["3","4","5","6"], c:[1],
 x:"Powyżej 38°C: 38,9; 38,2; 39,4; 38,3 — cztery pomiary. 37,9°C to stan podgorączkowy."},

{n:"8.21", t:8, u:1,
 w:"Schemat przedstawia kolejne czynności świadka zdarzenia, który zauważył leżącą osobę (wg wytycznych resuscytacji). Jeden krok zastąpiono znakiem zapytania."+
   SCHEMAT(["Oceń bezpieczeństwo","Sprawdź przytomność, zawołaj o pomoc","?","Oceń oddech (do 10 s)","Wezwij pomoc — 112","30 uciśnięć : 2 oddechy"]),
 q:"Jaki krok powinien znaleźć się w miejscu znaku zapytania?",
 o:["Udrożnij drogi oddechowe (odchyl głowę, unieś żuchwę).","Podaj poszkodowanemu wodę do picia.","Ułóż poszkodowanego w pozycji bocznej ustalonej.","Wykonaj 5 uderzeń między łopatki."], c:[0],
 x:"Oddech ocenia się dopiero po udrożnieniu dróg oddechowych — u nieprzytomnego język może je zablokować."},

{n:"8.22", t:8, u:1,
 w:"Przeczytaj tekst.\nNagłe zatrzymanie krążenia to stan, w którym serce przestaje skutecznie pompować krew. Najczęstszą przyczyną u dorosłych jest migotanie komór — chaotyczna praca serca, którą można przerwać wyładowaniem elektrycznym (defibrylacją). Szacuje się, że z każdą minutą zwłoki w defibrylacji szansa przeżycia zmniejsza się o ok. 7–10%. Uciśnięcia klatki piersiowej wykonywane przez świadków spowalniają ten spadek, bo podtrzymują przepływ krwi do mózgu i serca. Automatyczne defibrylatory zewnętrzne (AED) umieszcza się w miejscach publicznych, a ich obsługa jest możliwa dla każdego dzięki poleceniom głosowym.",
 q:"Które wnioski wynikają z tekstu?",
 o:["Im szybciej zostanie użyty AED, tym większa szansa przeżycia poszkodowanego.",
    "Uciskanie klatki piersiowej przez świadków ma sens jeszcze przed przyjazdem karetki.",
    "Defibrylacja jest skuteczna wyłącznie w pierwszej minucie po zatrzymaniu krążenia.",
    "AED może obsługiwać wyłącznie lekarz lub ratownik medyczny."], c:[0,1]}
];
