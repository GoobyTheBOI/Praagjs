import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div className="h-full">
              <div className="container py-4 text-gray-700 text-sm md:text-md lg:py-10">
                  <h1 className="text-4xl text-gray-900">De excursie</h1>
                  <p className="mb-2">Dit jaar gaan de tweedejaarsstudenten Webdesign en Mediadeveloper/ Webdeveloper gezamenlijk in de derde lesperiode op buitenlandexcursie naar Praag. Deze excursie maakt onderdeel uit van het onderwijs.</p>
                  <p className="mb-2">We vertrekken per vliegtuig op woensdag 22 april 2020 09:25 uur vanaf Schiphol. Iedereen dient zich daar om 7:00 uur ’s ochtends te melden bij het Meeting Point tussen spoor 3-4 en 5-6, op Schiphol Plaza.</p>
                  <p className="mb-2">De terugreis zal plaatsvinden op vrijdag 24 april 2020. We zullen dan rond 19:00 weer landen op Schiphol.</p>
                  <p className="mb-2">Het volledige programma ontvangen de studenten vooraf persoonlijk en is te zijner tijd te vinden op een website.</p>
                  <p className="mb-2">De begeleiders tijdens deze excursie zijn Jan van Os, Lukas Stroomer, Koen Borghols, Kees Schouten, Bahman Radfar, Els van den Nieuwenhuizen, Flip van Wijk, Thomas Tijs en Paul Langelaar.</p>
                </div>
            </div>
        );
    }
}
