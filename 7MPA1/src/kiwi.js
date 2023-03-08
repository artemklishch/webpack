import _ from "lodash";
import Heading from "./components/heading/heading";
import Kiwi from "./components/kiwi-image/kiwi-image";

const heading = new Heading();
heading.render(_.upperFirst("kiwyi"));
const kiwiImage = new Kiwi();
kiwiImage.render();
