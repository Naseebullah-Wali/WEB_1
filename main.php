<?php

// Validate functions
function validateX($xVal) {

  //return isset($xVal);
  if(isset($xVal))
  	{
  		if ($xVal == -2 || $xVal == -1.5 || $xVal == -1 || $xVal == -0.5 || $xVal == 0 || $xVal == 0.5 || $xVal == 1 || $xVal == 1.5 || $xVal == 2)
  			return true;
  		else
  			return false;
  	}
  	return false;
}

function validateY($yVal) {
  $Y_MIN = -5;
  $Y_MAX = 3;

  if (!isset($yVal))
    return false;

  $numY = str_replace(',', '.', $yVal);
  return is_numeric($numY) && $numY >= $Y_MIN && $numY <= $Y_MAX;
}

function validateR($rVal) {
  return isset($rVal);
}

function validateForm($xVal, $yVal, $rVal) {
  return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

// Hit check functions
function checkTriangle($xVal, $yVal, $rVal) {
  return $xVal <= 0 && $yVal >= 0 &&
    $yVal <= $xVal + $rVal;
}

function checkRectangle($xVal, $yVal, $rVal) {
  return $xVal >= 0 && $yVal >= 0 &&
    $xVal <= $rVal && $yVal <= $rVal/2;
}

function checkCircle($xVal, $yVal, $rVal) {
  return $xVal <=0 && $yVal <= 0 &&
    sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal;
}

function checkHit($xVal, $yVal, $rVal) {
  return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) ||
    checkCircle($xVal, $yVal, $rVal);
}

function addJSONElementToArray($jsonElem) {
    array_push($_SESSION["jsonElems"], $jsonElem);
}

function echoJSONArray() {
    echo '{';
    for ($i = 0; $i < count($_SESSION["jsonElems"]); $i++) {
        echo $jsonElem;
        if ($i != count($_SESSION["jsonElems"]) - 1) {
            echo ',';
        }
    }
    echo '}';
}

session_start();

if(!isset($_SESSION["jsonElems"])) {
    $_SESSION["jsonElems"] = array();
}

// Main logic
$xVal = $_POST['xval'];
$yVal = $_POST['yval'];
$rVal = $_POST['rval'];

$timezoneOffset = $_POST['timezone'];

$isValid = validateForm($xVal, $yVal, $rVal);
$converted_isValid = $isValid ? 'true' : 'false';
$isHit = $isValid ? checkHit($xVal, $yVal, $rVal) : 'Easter egg!';
$converted_isHit = $isHit ? 'true' : 'false';

$currentTime = date('H:i:s', time()-$timezoneOffset*60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$jsonData = '[' .
  "\"validate\":$converted_isValid," .
  "\"xval\":\"$xVal\"," .
  "\"yval\":\"$yVal\"," .
  "\"rval\":\"$rVal\"," .
  "\"curtime\":\"$currentTime\"," .
  "\"exectime\":\"$executionTime\"," .
  "\"hitres\":$converted_isHit" .
  "]";

addJSONElementToArray($jsonData);
echoJSONArray();

session_write_close();
