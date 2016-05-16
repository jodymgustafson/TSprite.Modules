/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
declare function require(s: string): void;

require("./specs/panel.spec");
require("./specs/sprite.spec");
require("./specs/collections.spec");
require("./specs/canvas.spec");

jasmine.getEnv().execute();
