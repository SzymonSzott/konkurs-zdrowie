# „W zdrowym ciele, zdrowy duch” — test przed etapem szkolnym

Interaktywny test dla uczniów szkół podstawowych przygotowujący do etapu szkolnego
Konkursu Tematycznego **„W zdrowym ciele, zdrowy duch”** 2026/2027
(Kuratorium Oświaty w Krakowie). Etap szkolny: **13 listopada 2026, godz. 9:30, 60 minut**.

👉 **[Uruchom test](https://szymonszott.github.io/konkurs-zdrowie/)**

## Zakres

**156 zadań zamkniętych** (jednokrotnego i wielokrotnego wyboru) w dwóch pulach:

- **120 zadań ćwiczeniowych** ułożonych według
  [zakresu wiedzy i umiejętności dla etapu szkolnego 2026/2027 (zał. nr 2 do regulaminu)](https://kuratorium.krakow.pl/wp-content/uploads/2026/07/zal.-nr-2-zakres-wiedzy-i-umiejetnosci-oraz-wykaz-literatury-2.pdf)
  i aktualnych wytycznych (WHO, ERC 2021, EFSA, przepisy polskie),
- **36 oficjalnych zadań z etapu szkolnego 2025/2026**
  ([arkusz](https://kuratorium.krakow.pl/wp-content/uploads/2025/08/arkusz-zadan-edukacja-zdrowotna.pdf),
  [schemat oceniania](https://kuratorium.krakow.pl/wp-content/uploads/2025/08/etap-szkolny-schemat-oceniania-3.pdf)).
  Pominięto zadania 1, 22, 33 i 34, unieważnione Komunikatem nr 3 z 26.11.2025 r.
  Zadania mają zwykle 6 odpowiedzi (A–F), z których poprawnych bywa 3–5.

| # | Temat (zakres etapu szkolnego 2026/2027) | Ćwiczeniowe | 2025/2026 |
|---|---|---:|---:|
| 1 | Pojęcie zdrowia i zdrowego stylu życia | 11 | 1 |
| 2 | Czynniki wpływające na zdrowie i samopoczucie | 12 | 5 |
| 3 | Higiena osobista, środki higieniczne i pielęgnacyjne | 12 | 2 |
| 4 | Zasady zdrowego żywienia i suplementacji | 21 | 12 |
| 5 | Skutki nieprawidłowych diet, nadmiaru suplementów, napojów energetycznych | 14 | 4 |
| 6 | Rozpoznawanie objawów chorobowych | 15 | 0 |
| 7 | Gorączka i jej rola w organizmie | 13 | 1 |
| 8 | Pierwsza pomoc w stanach zagrożenia życia i zdrowia | 22 | 1 |
| – | Tematy, które w 2026/2027 należą do etapu rejonowego | – | 10 |
| | | **120** | **36** |

W edycji 2025/2026 zakres był jeden dla wszystkich etapów. W tym roku etykiety produktów,
otyłość i BMI, choroby zakaźne oraz niemarnowanie żywności przeszły na etap rejonowy,
dlatego 10 takich zadań z zeszłorocznego arkusza jest domyślnie wyłączonych (można je włączyć).

Umiejętności z części III zakresu (obowiązujące na wszystkich etapach) ćwiczą
zadania oznaczone „praca ze źródłem”: tabele, wykresy, diagramy, schematy
i teksty źródłowe. Dane w ćwiczeniowych ankietach i doświadczeniach są przykładowe.

> **Uwaga:** zadania ćwiczeniowe nie pochodzą z oficjalnych arkuszy. W razie
> rozbieżności rozstrzyga literatura konkursowa: B. Woynarowska, M. Woynarowska,
> *Edukacja zdrowotna*, PWN 2025.

## Funkcje

- wybór puli (ćwiczeniowe / 2025/2026), tematów, liczby pytań (10 / 20 / 30 / 50 / wszystkie) i trybu
- losowa kolejność pytań **i** odpowiedzi przy każdym podejściu
- dwa tryby: sprawdzanie po każdym pytaniu z wyjaśnieniem albo wynik na końcu
- ocenianie jak na konkursie — liczba poprawnych odpowiedzi nie jest zdradzana,
  a zaznaczenie zbyt małej lub zbyt dużej liczby odpowiedzi daje 0 pkt
- wynik odniesiony do progu z regulaminu (75% — kwalifikacja do etapu rejonowego),
  z rozbiciem na tematy
- lista błędnych odpowiedzi (przy zadaniach 2025/2026 z linkiem do arkusza) i tryb „Powtórz błędne”

## Struktura

```
index.html             aplikacja (HTML + CSS + logika)
dane-szkolny.js        zadania ćwiczeniowe (120) + funkcje rysujące tabele, wykresy i schematy
dane-2526-szkolny.js   zadania z arkusza etapu szkolnego 2025/2026 (36)
```

## Źródło

Strona konkursu na stronie Kuratorium Oświaty w Krakowie:
[2026/2027](https://kuratorium.krakow.pl/konkurs-tematyczny-w-zdrowym-ciele-zdrowy-duch-dla-uczniow-szkol-podstawowych-wojewodztwa-malopolskiego-w-roku-szkolnym-2026-2027/) ·
[2025/2026](https://kuratorium.krakow.pl/konkurs-tematyczny-w-zdrowym-ciele-zdrowy-duch-dla-uczniow-szkol-podstawowych-wojewodztwa-malopolskiego-w-roku-szkolnym-2025-2026/)
(regulamin, harmonogram, zakres wymagań, arkusze, schematy oceniania).
