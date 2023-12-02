<?php

function games() {
  $fp = fopen('input.txt', 'r');

  while (($game = stream_get_line($fp, 0, "\n")) !== false) {
    [$id, $game] = explode(":", substr($game, 5));
    yield intval($id) => matches($game);
  }
}

function matches($game) {
  foreach (explode(";", $game) as $match) {
    $balls = [];

    foreach (explode(",", $match) as $selection) {
      [$amount, $color] = explode(" ", trim($selection));
      $balls[$color] = intval($amount);
    }

    yield $balls;
  }
}

/**
 * 12 red, 13 green, 14 blue
 */
$total = 0;

foreach (games() as $id => $game) {
  foreach ($game as $draw) {
    if (
      (($draw['red'] ?? 0) > 12) ||
      (($draw['green'] ?? 0) > 13) ||
      (($draw['blue'] ?? 0) > 14)) {
      continue 2;
    }
  }

  $total += $id;
}

echo "Part 1: $total\n";

$total = 0;

foreach (games() as $id => $game) {
  $mins = ['red' => 0, 'green' => 0, 'blue' => 0];

  foreach ($game as $draw) {
    foreach ($draw as $color => $amount) {
      $mins[$color] = max($amount, $mins[$color]);
    }
  }

  $total += array_product($mins);
}

echo "Part 2: $total\n";
