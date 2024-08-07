/**
 * Script Purpose: Custom Code for Black Shift
 * Author: Erlen Masson
 * Version: 5
 * Started: 7th August 2024
 */

console.log("Script v5");

//
//------- Detect device dark mode -------//
//

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  const meta = document.createElement("meta");
  meta.name = "color-scheme";
  meta.content = "light";
  document.head.appendChild(meta);
}

//
//------- Splide -------//
//

function splideSliderOne() {
  document.querySelectorAll(".partner-logos").forEach((splide) => {
    new Splide(splide, {
      type: "loop",
      autoWidth: true,
      arrows: false,
      pagination: false,
      gap: "5rem",
      drag: false,
      autoScroll: {
        autoStart: true,
        speed: 1,
        pauseOnHover: false,
      },
      breakpoints: {
        600: {
          gap: "3rem",
          autoScroll: { speed: 0.5 },
        },
      },
    }).mount(window.splide.Extensions);
  });
}

//
//------- GSAP -------//
//

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

// Function to check if the device is a touch device
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Initialize ScrollSmoother only on non-touch devices
function setupScrollSmoother() {
  if (!isTouchDevice()) {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0, // This value is for non-touch devices
    });
    //  ScrollTrigger.normalizeScroll(true);
  }
}

// Function to pin the benefits_image-wrapper
function pinBenefits() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clear existing ScrollTriggers

  if (window.innerWidth >= 1024) {
    // Desktop breakpoint
    ScrollTrigger.create({
      trigger: ".right",
      start: "top 64px",
      end: "bottom 70%",
      pin: ".benefits_image-wrapper",
      pinSpacing: true,
      // markers: true,
    });
  }
}

//
//------- Text Fade Animations -------//
//

// Ensure fonts are loaded before running animations
document.fonts.ready
  .then(function () {
    console.log("Fonts loaded successfully");

    console.log("Starting animations");
    fadeAnimations();
    maskAnimations(); // Call the new animation function
  })
  .catch(function () {
    console.error("Font loading error");
    // Fallback or additional error handling
  });

// Array to store SplitText instances
var splitTextInstances = [];

// Function for fade animations
function fadeAnimations() {
  var fadeStart = window.innerWidth < 768 ? "top 100%" : "top 85%";
  var fadeEnd = window.innerWidth < 768 ? "top 60%" : "bottom 75%"; // Mobile : Desktop
  var fadeEnd2 = window.innerWidth < 768 ? "top 50%" : "bottom 75%"; // Mobile : Desktop

  // Clear previous instances
  splitTextInstances.forEach((instance) => instance.revert());
  splitTextInstances = [];

  // Fade-In Text by Characters
  gsap.utils.toArray("[data-fade='chars']").forEach((element) => {
    const split = new SplitText(element, { type: "chars" });
    splitTextInstances.push(split); // Store instance
    gsap.set(split.chars, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd2,
          scrub: true,
        },
      })
      .to(split.chars, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.05,
      });
  });

  // Fade-In Text by Words
  gsap.utils.toArray("[data-fade='words']").forEach((element) => {
    const split = new SplitText(element, { type: "words" });
    splitTextInstances.push(split); // Store instance
    gsap.set(split.words, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
        },
      })
      .to(split.words, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.1,
      });
  });

  // Fade-In Text by Lines
  gsap.utils.toArray("[data-fade='lines']").forEach((element) => {
    const split = new SplitText(element, { type: "lines" });
    splitTextInstances.push(split); // Store instance
    gsap.set(split.lines, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
          // markers: true,
        },
      })
      .to(split.lines, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.15,
      });
  });

  // Fade-In Rich Text by Lines
  gsap.utils.toArray("[data-fade='rich-text']").forEach((richTextElement) => {
    gsap.utils
      .toArray(
        richTextElement.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, li, li::marker, blockquote"
        )
      )
      .forEach((element) => {
        const split = new SplitText(element, { type: "lines" });
        splitTextInstances.push(split); // Store instance
        gsap.set(split.lines, { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: fadeStart,
              end: fadeEnd,
              scrub: true,
            },
          })
          .to(split.lines, {
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.15,
          });
      });
  });

  // Fade-In Elements
  gsap.utils.toArray("[data-fade='element']").forEach((element) => {
    gsap.set(element, { opacity: 0, y: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      })
      .to(element, {
        opacity: 1,
        ease: "power2.inOut",
        y: 0,
      });
  });

  // Fade-In List
  gsap.utils.toArray("[data-fade='list']").forEach((list) => {
    // Convert the HTMLCollection of children to an array for easier manipulation
    const items = gsap.utils.toArray(list.children); // Now targets all direct children as an array

    items.forEach((item) => {
      gsap.set(item, { opacity: 0 }); // Initial state for each item

      gsap.to(item, {
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: item,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
          //markers: true, // Uncomment for debugging
        },
      });
    });
  });
}

// Function for masked slide-up animations
function maskAnimations() {
  var slideUpStart = window.innerWidth < 768 ? "top 100%" : "top 85%";
  var slideUpEnd = window.innerWidth < 768 ? "top 50%" : "bottom 75%"; // Mobile : Desktop

  // Masked Slide-Up Text by Words
  gsap.utils.toArray("[data-mask='words']").forEach((element) => {
    const words = wrapTextElements(element, "words");
    gsap.set(words, { y: "100%", opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: slideUpStart,
          end: slideUpEnd,
          scrub: true,
        },
      })
      .to(words, {
        y: "0%",
        opacity: 1,
        ease: "power1.out",
        stagger: 0.2,
      });
  });

  // Masked Slide-Up Text by Lines
  gsap.utils.toArray("[data-mask='lines']").forEach((element) => {
    const lines = wrapTextElements(element, "lines");
    gsap.set(lines, { y: "100%", opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: slideUpStart,
          end: slideUpEnd,
          scrub: true,
        },
      })
      .to(lines, {
        y: "0%",
        opacity: 1,
        ease: "power1.out",
        stagger: 0.1,
      });
  });
}

// Helper function to wrap text elements for masking
function wrapTextElements(element, type) {
  const split = new SplitText(element, { type: type });
  splitTextInstances.push(split); // Store instance
  split[type].forEach((item) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });
  return split[type];
}

//
//------- Read More -------//
//

// Toggle the truncated text
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("read-more")) {
    const textElement = event.target.previousElementSibling;
    textElement.classList.toggle("truncated");
    event.target.textContent = textElement.classList.contains("truncated")
      ? "Read More"
      : "Read Less";
  }
});

// Initialize the "Read More" elements
function toggleReadMore() {
  const truncatedElements = document.querySelectorAll(".truncated");

  truncatedElements.forEach((element) => {
    if (element.scrollHeight > element.offsetHeight) {
      if (
        !element.nextElementSibling ||
        !element.nextElementSibling.classList.contains("read-more")
      ) {
        const readMore = document.createElement("span");
        readMore.className = "read-more text-size-small";
        readMore.textContent = "Read More";
        element.parentNode.insertBefore(readMore, element.nextElementSibling);
      }
    }
  });
}

//
// Smooth Scroll to URL Anchors
//

function smoothScrollAnchors() {
  // Smooth scroll to section based on URL hash
  const smoothScrollToSection = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        gsap.to(window, { duration: 1, scrollTo: targetElement });
      }
    }
  };

  // Scroll after the entire page is loaded
  window.addEventListener("load", smoothScrollToSection);
}

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  splideSliderOne();
  setupScrollSmoother();
  pinBenefits();
  fadeAnimations();
  maskAnimations();
  toggleReadMore();
  smoothScrollAnchors();
});
