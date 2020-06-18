# PraagJS App
Een simpele app voor de praag excursie.

## Inhoudsopgave 
[De app](#de-app)  
[Installatie](#installatie)

## De app
We gaan een web app maken voor de excursie in Praag. In deze webapp moet duidelijk worden voor leraren en studenten wat voor activiteiten we gaan doen met daarmee de benodigde informatie.

## Installatie
1. Installeer alle node modules & build alle react apps 
```
cd frontend && npm i && npm run build && cd ../ && cd admin/ && npm i && npm run build && cd ../ && npm i && npm run start
```
2. Importeer de .sql op jouw mysql server(Kan lokaal of op server)
3. Kopiër de .env.example en verander de gekopieerde versie in .env
```
cp .env.example .e
```
4. Stel alle variables in de .env folder goed in
5. Start de server  
**Live server:** `npm run start`  
**Development server:** `npm run dev`
6. Bekijk het project op `localhost:4000`, of op de door jou ingestelde port.
7. Veel plezier met het gebruiken