// KingCh1ll //
// Last Edited: 2/18/2021 //
// website.js //

console.log(require("chalk").green("LOADING STARTED - WEBSITE => Now loading website."));

// Librarys //
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");

const passport = require("passport");

const path = require("path");
const parser = require("body-parser");

const Config = require("../globalconfig.json");
const Render = require("./utils/Render");

// Files //
const MainDir = path.resolve(`${process.cwd()}${path.sep}website`);
const Views = path.resolve(`${MainDir}${path.sep}views`);

// App //
const app = express();
const server = app.listen(Config.Debug == true ? 3000 : process.env.PORT);
const io = require("socket.io")(server)

// Code //
console.log("-------- Loading Website --------");
if (Config.Debug === false) {
  require("newrelic")
}

const Database = require("./utils/database")(process.env.mongooseURL)
global.Database = Database

require("./utils/passport")

app.use(session({
  secret: process.env.secretid,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(require("serve-favicon")(path.resolve(`${MainDir}${path.sep}assets${path.sep}images${path.sep}siteicons${path.sep}favicon.ico`)));

app.use("/assets", express.static(path.resolve(`${MainDir}${path.sep}assets`)));
app.set("views", Views)

app.use("/", require("./routes/main"));
app.use("/home", require("./routes/home"));
app.use("/bot", require("./routes/bot"));
app.use("/users", require("./routes/users"))
app.use("/api", require("./routes/api"));

app.use((request, response, next) => {
  response.status(404)

  Render(response, request, "error.ejs", {
    head: {
      SiteTitle: "404 - Not Found",
      SiteDescription: "Uh oh! Looks like the page you where looking for wasn't found. Dang man. KingCh1ll is a self-taught coder. He knows html, css, javascript, lua and more!",
      SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
    },

    // Navigation //
    navagation: {
      BrandName: "Ch1ll",
      BrandLink: "/home",
      BrandLogo: "/assets/images/kingch1ll.png",

      Links: {
        link1: {
          name: "Home",
          icon: "fas fa-home",
          link: "/home",
        },

        link2: {
          name: "Ch1llBlox",
          icon: "fas fa-robot",
          link: "/bot",
        },

        link3: {
          name: "Ch1ll Studios",
          icon: "fas fa-snowflake",
          link: "/ch1llstudios",
        }
      },
    },

    // Top //
    top: {
      BrandName: `404 - Not Found`,
      BrandLogo: "/assets/images/404.png",

      buttons: {
        button1: {
          name: "Home",
          link: "/home"
        },

        button2: {
          name: "Ch1llBlox",
          link: "/bot"
        },

        button3: {
          name: "Ch1ll Studios",
          link: "/ch1llstudios"
        }
      },

      backgroundURL: null,
      alert: null
    },

    // Features //
    features: null,

    // Reviews //
    reviews: null,

    // Footer //
    footer: {
      Description: "KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
    },

    // Scripts //
    scripts: {
      jquery: true,
      popper: true,
      bootstrap: true,
      wow: true,
      smoothscroll: true,
      autohidingnavbar: true,
      pace: true,
      typed: true
    }
  });
});

app.use((err, request, response, next) => {
  console.error("Website Error!", err.stack);

  response.status(500)
  Render(response, request, "error.ejs", {
    head: {
      SiteTitle: "Home - KingCh1ll",
      SiteDescription: "KingCh1ll is a self-taught coder. He knows html, css, javascript, lua and more!",
      SiteKeywords: "KingCh1ll, King, Ch1ll, KingChill, Chill, Discord, Developer, Developer Discord, Discord Developer, Roblox, Roblox Developer, Developer Roblox",
    },

    // Navigation //
    navagation: {
      BrandName: "KingCh1ll",
      BrandLink: "#top",
      BrandLogo: "/assets/images/kingch1ll.png",

      Links: {
        link1: {
          name: "Home",
          icon: "fas fa-home",
          link: "#top",
        },

        link2: {
          name: "Ch1llBlox",
          icon: "fas fa-robot",
          link: "/bot",
        },

        link3: {
          name: "Ch1ll Studios",
          icon: "fas fa-snowflake",
          link: "/ch1llstudios",
        }
      },
    },

    // Top //
    top: {
      BrandName: "Error!",
      BrandLogo: "/assets/images/500.png",

      buttons: {
        button1: {
          name: "Home",
          link: "/home"
        },

        button2: {
          name: "Ch1llBlox",
          link: "/bot"
        },

        button3: {
          name: "Ch1ll Studios",
          link: "/ch1llstudios"
        }
      },

      backgroundURL: null,
      alert: null
    },

    // Features //
    features: null,

    // Reviews //
    reviews: null,

    // Footer //
    footer: {
      Description: "Uh oh! An error occured. KingCh1ll is a self taught developer that enjoys coding. He knows many coding languages."
    },

    // Scripts //
    scripts: {
      jquery: true,
      popper: true,
      bootstrap: true,
      smoothscroll: true,
      autohidingnavbar: true,
      pace: true,
      typed: true
    }
  });
});

io.on("PrefixUpdated", async (prefix, id) => {
  // TODO
})

console.log(`SUCCESS - WEBSITE => Website successfully deployed!`)