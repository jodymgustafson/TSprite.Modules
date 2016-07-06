/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
import {debugEnabled} from "../src/Base";

debugEnabled(true);

declare function require(s: string): void;

require("./specs/panel.spec");
require("./specs/sprite.spec");
require("./specs/collections.spec");
require("./specs/canvas.spec");
require("./specs/MultiRectCollisionChecker.spec");
require("./specs/SATCollisionChecker.spec");

jasmine.getEnv().execute();
