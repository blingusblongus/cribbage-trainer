<style>
  img[alt=Home] {
    width: 100px;
  }
  .flex{
    display: flex;

  }
</style>
# Cribbage Trainer

**Duration:** _2 week sprint_

An full-stack, full CRUD web application for Cribbage Players of all skill levels to learn cribbage hand scoring and practice making informed gameplay decisions through interactive tutorials, game modes, direct feedback, and statistics.

Features include a main challenge mode, a tutorial in hand scoring for beginners, and personal and public high score tracking.

<div class="flex">
<div>
Upon logging in to the app, the user is presented with a home screen, from which they can navigate throughout the app.
</div>
<img align="right" width="100" src="images/home_screen.png">
</div>

Tapping the **Learn** button takes the user to the tutorial, in which the user is presented with a series of screens explaining a single scoring technique or quirk of the game, and tasked with finding all the scoreable card combinations in that hand.

The primary challenge mode, titled **Cribbage Golf**, is a game in which the user is presented six random playing cards, and asked to choose to keep the best hand of four cards, disregarding the crib. Every scoring possibility of those four cards and every possible random card chosen from the deck, and an average score is assigned. The app also calculates the average score of every other possible hand the user could have chosen, and evaluates the user based on how close to statistically optimal their choice was. If the user did not choose the best hand, both their chosen hand and the best hand are presented for comparison. Additional statistics including the minimum possible, maximum possible, and average points for both hands are available in a optionally-displayed histogram.