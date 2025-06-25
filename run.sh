#!/bin/sh

echo "Starting bot.."
nodejs ./bot.js >> bot.log 2>&1 &

echo "Starting Youtube Player Express app.."
nodejs ./player.js >> player.log 2>&1 &

