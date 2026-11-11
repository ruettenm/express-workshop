# Node.js Workshop (Express part)

## Voraussetzungen
* Node.js in der Version aus `.nvmrc` (`nvm use`)
* Abhängigkeiten installieren: `npm install`

## Übungen
Jede Übung liegt in einem eigenen Branch (`exercise-01` bis `exercise-06`).
Der Branch einer Übung enthält die Aufgabenstellung und die Lösung der vorherigen Übung.

```
git checkout exercise-01
npm install
```

Nach jedem Branch-Wechsel `npm install` erneut ausführen, da neue Abhängigkeiten hinzukommen können.

## Skripte
* `npm run build`: transpiliert `src/` nach `dist/`
* `npm run start`: startet die App mit `ts-node`
* `npm run start:dist`: startet die transpilierte App aus `dist/`
