# Node.js Workshop (Express part)

## Allgemein
* Bei jedem Branch-Wechsel müssen ggf. hinzugekommene Dependencies installiert werden. -> `npm install`

## Übung 01
* Installiere express (und die nötigen types)
* Erweitere die `src/index.ts` und starte in dieser Beispiel Express Anwendung
  
### Ziel
* Mit dem Befehl `npm run build` sollte eure App transpilieren und 
  eine `index.js` im `dist` Ordner ablegt werden.
* startet eure app im development mode per `npm run start`

### Bonus
* Nutze `ts-node-dev`, um deinen Server automatisch neu zu starten, sobald du Änderungen gemacht hast.

- - -

## Übung 02a
* Implementiere eine Middleware welche jeden eingehenden Request zu deiner Beispielanwendung in die Konsole loggt.

### Ziel
* Wenn du auf deine Beispielanwendung zugreifst, solltest du bei jedem Aufruf einen Logeintrag in der Konsole sehen.

## Übung 02b
* Binde eine 3rd party middleware **vor** deiner eigenen Middleware (aus 2a) ein 
  > https://github.com/expressjs/morgan

### Ziel
* Du solltest nun zwei Logeinträge pro Request in deiner Konsole sehen.

### Bonus
* Warum siehst du den Logeintrag von `morgan` **nach** deinem eigenen Eintrag, obwohl die middleware vor deiner eigenen "eingereiht" ist?

## Übung 02c
* Implementiere einen GET und POST Endpoint (siehe `sayHello.ts`)
  * Der GET Endpoint verarbeitet einen Query-Parameter "name" (Siehe `exercise-02c.http`)
  * Der POST Endpoint verarbeitet einen JSON Body und in diesem die Property "name" (Siehe `exercise-02c.http`)
  * Wenn der `name` nicht übergeben wird, wird "World" als default genommen.
  * Die Antwort der beiden Endpoints soll JSON sein. Beispiel:
    ```
    {
      "hello": "Matthias"
    }
    ```
* Registriere die beiden neuen Request-Handler in der `index.ts`.

### Ziel
* Die Requests auf der Datei `exercise-02c.http` werden von eurer Anwendung erfolgreich verarbeitet
* Die Units-Tests in der Datei `sayHello.spec.ts` sollten nun **grün** sein.

### Bonus
* Implementiere die fehlenden Unit-Tests für den POST Endpoint (siehe `sayHello.spec.ts`).

- - -

## Übung 03
* Implementiere deine eigenen **Error Request Handler**, um so die Antwort im Fehlerfall zu definieren.
* Werfe im GET-Handler bei den folgenden Namen die entsprechenden Error
  * `Marco`: NotFoundError
  * `Vincent`: Default JS Error
  * `API`: Einen ApiError
* Erweitere den `defaultErrorHandler` in der Datei `errorHandler.ts` wie folgt:
  * Bei einem `ApiError` ein JSON mit Informationen über `errorKey` und `message` zurückgegeben wird
  * Bei einem `NotFoundError` soll der passende HTTP Status Code gesetzt werden
  * Wenn der Error Request Handler nicht für die Verarbeitung verantwortlich ist, wird der nächste aufgerufen

### Ziel
* Der Standard Express Error Handler wird nicht mehr verwendet.
* Die Requests auf der Datei `exercise-03.http` werden von eurer Anwendung korrekt verarbeitet

### Bonus
* Erweitere die Unit-Tests `errorHandler.spec.ts` und erreiche eine 100% test coverage.
* Erweitere die Unit-Tests `sayHello.spec.ts` und ergänze Tests für die neuen Exceptions.

- - -

## Übung 04
* Implementiere einen **separaten Router** für einen Admin Bereich (siehe `adminRouter.ts`)
  * Der in der Datei exportierte Router soll in der `index.ts` eingebunden werden 
  * Er soll alle Routen unterhalb von `/admin` behandeln
* Der Adminbereich ist über einen Pfad Parameter geschützt (`http://localhost:3000/admin/:key/[...]`)
* Ein **Parameter-Handler** wertet den angegebenen Key aus und wirf bei einem falschen Key einen `ForbiddeError`
  * Sucht euch einen beliebigen gültigen key aus
  * Erweitert euer Error Handling (`errorHandler.ts`) um bei falscher Key Eingabe einen HTTTP 403 zurückzugeben. 

### Ziel
* Die Requests auf der Datei `exercise-04.http` werden von eurer Anwendung erfolgreich verarbeitet
* Wenn ihr den Endpoint mit einem falschen key aufruft, dann gibt eure Anwendung einen 403 Error zurück.

### Bonus
* Was passiert, wenn ihr den Parameter-Handler in die `index.ts` verschiebt?
* Schreibe Tests für deinen neuen Router. Hierzu ist die Bibliothek `supertest` hilfreich.
  > https://github.com/visionmedia/supertest

- - -

## Übung 05a
* Die Startseite deiner Anwendung soll erweitert werden, sodass ein HTML Dokument als Antwort geliefert wird.
  * Das HTML wird von der template engine "EJS" gerendert
  * Es behinhaltet eine Begrüßung (h1) sowie eines von drei zufälligen Bildern
  * Erstelle ebenfalls eine CSS-Datei und binde diese im HTML ein
    * Dein Stylesheet sollen im Ordner `src/assets/css` liegen 
    * Deine Bilder sollen im Ordner `src/assets/images` liegen
  * Alle statischen Dateien sollen über `/static/...` zugänglich sein
    * Also z.B. `http://localhost:3000/static/css/styles.css` oder `http://localhost:3000/static/images/some-image.jpg`
* Die Ermittlung des Bildes soll im Request Handler erfolgen und dem Template per Context übergeben werden

## Übung 05b
* Erweitere das zuvor genutzte HTML Template, sodass es zusätzlich zu dem Bild auch einen optionalen Namen erwartet.
  * In der Begrüßung (h1) soll nun auch der Name ausgegeben werden, sofern ein Name dem Template übergeben wird
  * Ändere deinen GET Endpoint in der `sayHello.ts`. Hier soll nun ebenfalls das Template gerendert werden und kein JSON zurückgegeben

### Bonus
* Funktioniert der production build (`npm run build` / `npm run start:dist`) noch?
  * Falls Nein: Analysiere das Problem und behebe es
