import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";
import helloData from "../data/hello.json";

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;
let routes: string[] = [];

app.get("/", (req, res) => {
  const routesVisited = "/";
  routes.push(routesVisited);
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/creation-time", (req, res) => {
  const routesVisited = "/creation-time";
  routes.push(routesVisited);
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  const routesVisited = "/current-time";
  routes.push(routesVisited);
  const dateOfRequestHandling = new Date();

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  const routesVisited = "/hits";
  routes.push(routesVisited);
  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  const routesVisited = "/hits-stealth";
  routes.push(routesVisited);
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  const routesVisited = "/ponies";
  routes.push(routesVisited);
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/season-one", (req, res) => {
  const routesVisited = "/season-one";
  routes.push(routesVisited);
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/season-one/random", (req, res) => {
  const routesVisited = "/season-one/random";
  routes.push(routesVisited);
  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

app.get("/hello-world", (req, res) => {
  const routesVisited = "/hello-world";
  routes.push(routesVisited);
  res.json({
    message: "Loaded Hello JSON data:",
    data: helloData,
    countedAsHit: false,
  });
});

app.get("/ponies/random", (req, res) => {
  const routesVisited = "/ponies/random";
  routes.push(routesVisited);
  const randomPonies = pickRandom(ponyData.members);
  res.json({
    countedAsHit: false,
    data: randomPonies,
  });
});

app.get("/history", (req, res) => {
  const routesVisited = "/history";
  routes.push(routesVisited);
  res.json({
    routes,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
