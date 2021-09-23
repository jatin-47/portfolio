/* Coffe with me form submission */
var theForm = document.getElementById("theForm");

new stepsForm(theForm, {
  onSubmit: function (form) {
    classie.addClass(theForm.querySelector(".simform-inner"), "hide");

    var link = "https://script.google.com/macros/s/AKfycbws3HWk3Sr6LpZ4sSv2lf1a60lmTYwU2D_A8XpXyH-ixDZubNu5RkHFHsGmTAh-Hga1/exec";
    jQuery.ajax({
      url: link,
      data: { Message: $("#Message").val(), Name: $("#Name").val(), Email: $("#Email").val() },
      type: "POST",
      dataType: "xml",
      crossDomain: true,
      statusCode: {
        0: function () {
          //console.log("response 0");
        },
        200: function () {
          //console.log("response 200");
        },
      },
    });

    var messageEl = theForm.querySelector(".final-message");
    messageEl.innerHTML = "Thank you! I'll contact you shortly.";
    classie.addClass(messageEl, "show");
  },
});
// ###########################################################
/* downloadCV gif */
function changeImage() {
  $(".downloadCV").html("<p>Download my Resume</p><img onclick='changeImage()' src='img/dwnld.gif'>");
  setTimeout(() => {
    window.open("https://docs.google.com/document/d/101Yk0bawQjFysSZzd1p2KIjoekAkEeYHqOQPeuj65DY/edit?usp=sharing", "_blank");
  }, 2000);

  $(".resume").addClass("downloaded");
  $(".downloaded").removeClass("resume");
}

/* smooth scroll */
/* add class = smooth to a tags for smooth scroll */
function scrollToElement(selector) {
  $("html, body").animate(
    {
      scrollTop: $(selector).offset().top,
    },
    1500
  );
}

$(document).on("click", "a.smooth", function () {
  scrollToElement($(this).attr("href"));
});

/* hamburger */
function toggleSidenav() {
  document.body.classList.toggle("sidenav-active");
  document.body.classList.toggle("noscroll");
}
// ###################################################################
jQuery(document).ready(function ($) {
  //set animation timing
  var animationDelay = 2500,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect
    revealDuration = 600,
    revealAnimationDelay = 1500;

  initHeadline();

  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($(".cd-headline.letters").find("b"));
    //initialise headline animation
    animateHeadline($(".cd-headline"));
  }

  function singleLetters($words) {
    $words.each(function () {
      var word = $(this),
        letters = word.text().split(""),
        selected = word.hasClass("is-visible");
      for (i in letters) {
        if (word.parents(".rotate-2").length > 0) letters[i] = "<em>" + letters[i] + "</em>";
        letters[i] = selected ? '<i class="in">' + letters[i] + "</i>" : "<i>" + letters[i] + "</i>";
      }
      var newLetters = letters.join("");
      word.html(newLetters).css("opacity", 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function () {
      var headline = $(this);

      if (headline.hasClass("loading-bar")) {
        duration = barAnimationDelay;
        setTimeout(function () {
          headline.find(".cd-words-wrapper").addClass("is-loading");
        }, barWaiting);
      } else if (headline.hasClass("clip")) {
        var spanWrapper = headline.find(".cd-words-wrapper"),
          newWidth = spanWrapper.width() + 10;
        spanWrapper.css("width", newWidth);
      } else if (!headline.hasClass("type")) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find(".cd-words-wrapper b"),
          width = 0;
        words.each(function () {
          var wordWidth = $(this).width();
          if (wordWidth > width) width = wordWidth;
        });
        headline.find(".cd-words-wrapper").css("width", width);
      }

      //trigger animation
      setTimeout(function () {
        hideWord(headline.find(".is-visible").eq(0));
      }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if ($word.parents(".cd-headline").hasClass("type")) {
      var parentSpan = $word.parent(".cd-words-wrapper");
      parentSpan.addClass("selected").removeClass("waiting");
      setTimeout(function () {
        parentSpan.removeClass("selected");
        $word.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out");
      }, selectionDuration);
      setTimeout(function () {
        showWord(nextWord, typeLettersDelay);
      }, typeAnimationDelay);
    } else if ($word.parents(".cd-headline").hasClass("letters")) {
      var bool = $word.children("i").length >= nextWord.children("i").length ? true : false;
      hideLetter($word.find("i").eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find("i").eq(0), nextWord, bool, lettersDelay);
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word.parents(".cd-words-wrapper").animate({ width: "2px" }, revealDuration, function () {
        switchWord($word, nextWord);
        showWord(nextWord);
      });
    } else if ($word.parents(".cd-headline").hasClass("loading-bar")) {
      $word.parents(".cd-words-wrapper").removeClass("is-loading");
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, barAnimationDelay);
      setTimeout(function () {
        $word.parents(".cd-words-wrapper").addClass("is-loading");
      }, barWaiting);
    } else {
      switchWord($word, nextWord);
      setTimeout(function () {
        hideWord(nextWord);
      }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if ($word.parents(".cd-headline").hasClass("type")) {
      showLetter($word.find("i").eq(0), $word, false, $duration);
      $word.addClass("is-visible").removeClass("is-hidden");
    } else if ($word.parents(".cd-headline").hasClass("clip")) {
      $word.parents(".cd-words-wrapper").animate({ width: $word.width() + 10 }, revealDuration, function () {
        setTimeout(function () {
          hideWord($word);
        }, revealAnimationDelay);
      });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass("in").addClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        hideLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else if ($bool) {
      setTimeout(function () {
        hideWord(takeNext($word));
      }, animationDelay);
    }

    if ($letter.is(":last-child") && $("html").hasClass("no-csstransitions")) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass("in").removeClass("out");

    if (!$letter.is(":last-child")) {
      setTimeout(function () {
        showLetter($letter.next(), $word, $bool, $duration);
      }, $duration);
    } else {
      if ($word.parents(".cd-headline").hasClass("type")) {
        setTimeout(function () {
          $word.parents(".cd-words-wrapper").addClass("waiting");
        }, 200);
      }
      if (!$bool) {
        setTimeout(function () {
          hideWord($word);
        }, animationDelay);
      }
    }
  }

  function takeNext($word) {
    return !$word.is(":last-child") ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return !$word.is(":first-child") ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass("is-visible").addClass("is-hidden");
    $newWord.removeClass("is-hidden").addClass("is-visible");
  }
});
