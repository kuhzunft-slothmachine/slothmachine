import classes from "./About.module.scss";

const About = () => {
  return (
    <div className={classes.block}>
      <div className={classes.content}>
        <h3>ABOUT THIS PROJECT</h3>
        <p>
          The Slotmachine is a project by Achim Zepezauer that is currently
          combining 225 different recordings (each one with a length of 45
          seconds) from 18 artists in a random order. You can either simply
          press START and get surprised or deactivate the AUTO PLAY - Button to
          make a selection of specific instruments.
        </p>

        <p>
          There are two ways to support the project. You can donate via paypal
          at the donate-button or you can purchase a 10“ vinyl copy of some
          combinations, picked by Achim. The record is available from February
          1st, 2019 on, at Gruenrekorder or right here at{" "}
          <a href="http://www.kuhzunft.com/records.html">
            www.kuhzunft.com/records.html
          </a>, or elsewhere.
        </p>

        <p>The Artists are:</p>

        <ul>
          <li>Animals (world): Themselves</li>
          <li>
            <a href="http://www.jaapblonk.com">Jaap Blonk&nbsp;</a>(NL): Voice
          </li>
          <li>
            <a href="http://inventingzero.net/home/">John Chantler</a> (AU):
            Modular Synth
          </li>
          <li>
            <a href="http://inventingzero.net/home/">Serge Corteyn</a> (DE):
            Guitar
          </li>
          <li>
            <a href="http://www.rhodridavies.com">Rhodri Davies&nbsp;</a>(GB):
            Harp
          </li>
          <li>
            <a href="https://www.emiliegirardcharest.com">
              &Eacute;milie Girard-Charest
            </a>{" "}
            (CN): Cello
          </li>
          <li>
            <a href="http://gailegriciute.com">Gailė Griciūtė&nbsp;</a>(LT):
            Prepared Piano
          </li>
          <li>
            <a href="http://www.florian-hartlieb.de">Florian Hartlieb</a> (DE):
            Computer
          </li>
          <li>
            <a href="http://www.sonicjourneys.com">Richard Lerman&nbsp;</a>(US):
            Piezo + Hydrophone
          </li>
          <li>
            <a href="http://www.seanmacerlaine.com">
              Se&aacute;n Mac Erlaine&nbsp;
            </a>(IE): Woodwinds
          </li>
          <li>
            <a href="http://www.seanmacerlaine.com">
              Se&aacute;n Mac Erlaine&nbsp;
            </a>(IE): Woodwinds
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Bart_Maris">Bart Maris</a>{" "}
            (BE): Trumpet
          </li>
          <li>
            <a href="https://www.discogs.com/artist/75586-Jérôme-Noetinger">
              J&eacute;r&ocirc;me Noetinger&nbsp;
            </a>(FR): Tape Machine
          </li>
          <li>
            <a href="https://www.pabloparedes.com">Pablo Paredes</a> (CL):
            Keyboards
          </li>
          <li>
            <a href="http://www.carolinpook.com">Carolin Pook</a> (DE/US):
            Violin
          </li>
          <li>
            <a href="https://www.discogs.com/artist/161037-Michael-Vatcher">
              Michael Vatcher
            </a>{" "}
            (US): Drums
          </li>
          <li>
            <a href="https://www.simonwhetham.co.uk">Simon Whetham</a> (GB):
            Field Recordings
          </li>
          <li>
            <a href="http://martazapparoli.blogspot.com">
              Marta Zapparoli&nbsp;
            </a>(IT): Radio Waves
          </li>
          <li>
            <a href="http://www.kuhzunft.com">Achim Zepezauer</a> (DE):
            Drumcomputer / Acoustics / Electronics / Words
          </li>
        </ul>

        <p>Guida Ribeiro developed the website.</p>

        <p>Photographers Credits:</p>

        <ul>
          <li>
            The artists have taken photos or painted pictures themselves, with
            the exception of:
          </li>

          <li>
            Andr&eacute; Symann: Photos of Achim Zepezauer / Michael Vatcher
          </li>

          <li>
            Sabine Niggemann: Photos of J&eacute;r&ocirc;me Noetinger / Achim
            Zepezauer
          </li>

          <li>
            Th.C.White / Tobias Daemgen / Daniel K&auml;mper: Photos of Achim
            Zepezauer
          </li>

          <li>Liz Racz: Drawings for J&eacute;r&ocirc;me Noetinger</li>

          <li>
            Daaryl Feehely: Photos of Rhodri Davies broken things (Horsehair,
            metal, gut, nylon)
          </li>

          <li>Warren Orchard: Photo of Rhodri Davies</li>

          <li>
            Photos of Jaap Blonk: Cheeks: Lisette Stalenhoef / Commercials:
            unknown (1982) / Frying: Marco Douma / Humhum: Masha Bakker /
            Lanketrrgll: Jochen Roeder / Oh: Raoul van der Weide / Oneandonly:
            Irena Jorgensen / Ploff: Mart&iacute;n Gubbins / Ptk: Jaap Blonk /
            Rages: Paola Scagliotti
          </li>

          <li>
            Caoimh&iacute;n &Oacute; Raghallaigh: Photos of Se&aacute;n Mac
            Erlaine
          </li>

          <li>Michelle Browne: Photos of Se&aacute;n Mac Erlaine</li>

          <li>Myles O&rsquo;Reilly: Photos of Se&aacute;n Mac Erlaine</li>

          <li>Frieda Hartlieb: Drawings for Florian Hartlieb</li>

          <li>Lithographies unknown</li>
        </ul>

        <p>
          Thank you Roland Etzin &amp; Lasse-Marc Riek from Gruenrekorder Thank
          you Guida Ribeiro for developing the website. Thank you to Angelika
          von Ammon. Thank you Maria Trautmann, Sindy Tscherrig &amp; Lisa
          Balzer. Thank you everybody else for helping and being involved in any
          way.
        </p>

        <p>This project was kindly funded by:</p>

        <img
          src="/media/uploads/froala_editor/images/logo3.jpg"
          style={{ height: "100px" }}
          className={classes.fundingLogo}
        />

        <img
          src="/media/uploads/froala_editor/images/logo2_haXOpRD.jpg"
          style={{ height: "80px" }}
          className={classes.fundingLogo}
        />

        <img
          src="/media/uploads/froala_editor/images/gruenrekorder_logo%20(1).png"
          style={{ height: "100px" }}
          className={classes.fundingLogo}
        />

        <img
          src="/media/uploads/froala_editor/images/NRW-logo.jpg"
          style={{ width: "300px" }}
          className={classes.fundingLogo}
        />

        <p>
          <a href="http://www.kuhzunft.com/impressum.html">
            &bdquo;datenschutz / impressum&ldquo;
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
