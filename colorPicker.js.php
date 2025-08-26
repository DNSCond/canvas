<?php header('content-type: text/javascript');
$filegc = file_get_contents('./colorPicker.js');
echo "// <!DOCTYPE javascript>\n";
echo preg_replace('/^import.+|^export\\s+/m', "\n// ecmascript type=module\n\n", $filegc);
