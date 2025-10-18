<?php use ANT_COOKIE_Consent\ANTNavLinkTag;
use function ANT_COOKIE_Consent\ANTNavHome;
use function ANT_COOKIE_Consent\ANTNavBuzz;
use function ANT_COOKIE_Consent\create_head;
use ANT_COOKIE_Consent\ServerHeader;

require_once "{$_SERVER['DOCUMENT_ROOT']}/home/header/create_head.php";
$cacheBuster = Date::requestTime()->phpformat('Y-m-d\\TH_i_s');
create_head('The Drawer!', [
    'base' => '/canvas/', 'no-account' => true,
    'ServerHeader' => (new ServerHeader('Drawer/0.1')),
], [
    //new ANTNavLinkTag('stylesheet', "stylesheet.css?cache-buster=$cacheBuster"),
    //new ANTNavLinkTag('stylesheet', "canvasDimesnions.css?cache-buster=$cacheBuster"),
    new ANTNavLinkTag('stylesheet', "stylesheet.css"),
    new ANTNavLinkTag('stylesheet', "canvasDimesnions.css"),
], [
    ANTNavHome(),
    ANTNavBuzz('.', 'Canvas', true),
]);
$defaultColor = '#0073a6' ?>
<div class="divs" style="margin-top:0!important">
    <h1><a href=".">ANT.ractoc.com Canvas</a> (Work in progress)</h1>
    <div id=main role=none>
        <p>this canvas works. but its still very much work in progress
        <div id=controls>
            <label for=label-colorPicker>Select Color:</label>
            <color-picker2
                    id=colorPicker
                    value="<?= $defaultColor ?>"
                    input-id=label-colorPicker
                    swatches="#00a8f3;#8cfffa;#fff100;#ff4500;#fea700;#fee1b9;#00ff00;#00a8f3;#0073a6;#00587f;#004665;#002d40;#ff4500;#a62c00;#7e2100;#651a00;#401100;#fff100;#a68300;#7e6400;#655000;#403c00;#00ff00;#00a600;#007e00;#006500;#004000;#ff00ff;#a600a6;#7e007e;#650065;#400040;#00ffff;#00a6a6;#007e7e;#006565;#004040;#fea700;#a66d00;#7e5300;#654200;#aeef0f;#7aa60a;#5d7f08;#4a6506;#2f4004;#40bf55;#38a648;#2b7f37;#22652c;#15401c;#8e46db;#6a35a6;#51297f;#402065;#291440;#758eb1;#fefefe;#272727;#fdf5d9;#00bf00;#009500;#0f0f0f;#000000;#fce5bb;#c77f08;#1f1f1f;#151515;#005100;#004000;#ffffff;#f5749d;#f30083;#fee1b9;#0072f3;#004fa9;#616161;#00f331;#ff4500;#87ceeb;#99ffff;#cbffff;#191970;#fe57e8;#35cf38;#5bcffb;#3c8aa6;#2e697f;#255465;#173540;#f5abb9;#a6747d;#7f5960;#65464c;#402d30;#fe8125;#ad0512;#fa5511;"
            ></color-picker2><!---->
            <!--<input value="<?= $defaultColor ?>" id=label-colorPicker type=color>-->
            ;
            <button onclick="context.clearRect(0, 0, ...canvasSize());"
                    type=button>clear canvas
            </button>
            <button onclick="download()" type=button>download canvas</button>
            <button onclick="void(bucketFillActivated=!bucketFillActivated);bucketFillUpdate(this)"
                    id=bucketFillButton aria-pressed=false type=button>bucketFill()
            </button>
            <label for=Bucket-fillPercentage>Bucket-fill percentage:</label>
            <input id="Bucket-fillPercentage" min=0 max=100 step=0 type=range>
        </div>
        <canvas id=drawingCanvas></canvas>
        <script type=module>
            import {html_color_names} from "./html_color_names.js";
            import "./colorPicker2.js";

            {
                const colorPicker = document.getElementById('colorPicker');
                const array = [], proto = {
                    get [Symbol.toStringTag]() {
                        return `Color(${this.name}=${this.color})`;
                    },
                };
                for (let [name, color] of Object.entries(html_color_names.samecase)) {
                    array.push({color, name, __proto__: proto});
                }
                console.log(array.join().replaceAll(/,/g, ',\n'));
                colorPicker.setSwatches(array);
            }
        </script>
        <script src=app.js defer></script>
        <script src="<?= 'data:text/javascript;charset=UTF-8;base64,' . base64_encode("window.domContentLoadedPromise.then(function(){updateColor.call({value:'$defaultColor'})});") ?>"></script>
    </div>
    <a href="<?= '/dollmaker1/colors.php' ?>">Colors</a>
</div>
