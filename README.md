# Node.js Workshop (Express part)

## Übung 01
* Installiere express (und die nötigen types)
* Erweitere die `src/index.ts` und starte in dieser Beispiel Express Anwendung
  
### Ziel:
* Mit dem Befehl `npm run build` sollte eure App transpilieren und 
  eine `index.js` im `dist` Ordner ablegt werden.
* startet eure app im development mode per `npm run start`

## Übung 02a
* Implementiere eine Middleware welche jeden eingehenden Request zu deiner Beispielanwendung in die Konsole loggt.

### Ziel:
* Wenn du auf deine Beispielanwendung zugreifst, solltest du bei jedem Aufruf einen Logeintrag in der Konsole sehen.

## Übung 02b
* Binde eine 3rd party middleware **vor** deiner eigenen Middleware (aus 2a) ein 
  > https://github.com/expressjs/morgan

### Ziel: 
* Du solltest nun zwei Logeinträge pro Request in deiner Konsole sehen.

### Bonus:
* Warum siehst du den Logeintrag von morgen **nach** deinem eigenen Eintrag, obwohl die middleware vor deiner eigenen "eingereiht" ist?

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
* Binde die beiden neuen Requesthandler in der `index.ts` ein

### Ziel: 
* Die Requests auf der Datei `exercise-02c.http` werden von eurer Anwendung erfolgreich verarbeitet
* Die Units Tests in der Datei `sayHello.spec.ts` sollten nun **grün** sein.

### Bonus:
* Implementiere die fehlenden Unit Tests für den POST Endpoint (siehe `sayHello.spec.ts`).
