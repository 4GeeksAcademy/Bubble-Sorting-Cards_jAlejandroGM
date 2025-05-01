import "./style.css";

const CardValues = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K'
};

const suits = ["♠", "♣", "♥", "♦"];

const randomNumber = () => {
  return Math.floor(Math.random() * 13) + 1;
}

const randomSuit = () => {
  let iSuit = Math.floor(Math.random() * suits.length);
  return suits[iSuit];
}

const getCardDisplay = (value) => {
  return CardValues[value] || value.toString();
};

const generateCard = () => {
  const value = randomNumber();
  const suit = randomSuit();
  return {
    number: getCardDisplay(value),
    suit,
    value: value,
    color: (suit === "♥" || suit === "♦") ? "red" : "black"
  };
};

const generateDeck = (quantity) => {
  const deck = [];
  for (let i = 0; i < quantity; i++) {
    deck.push(generateCard());
  }
  return deck;
};

const createCardElement = (card) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.innerHTML = `
      <span class="top suit ${card.color}">${card.suit}</span>
      <span class="number ${card.color}">${card.number}</span>
      <span class="bot suit ${card.color}">${card.suit}</span>
  `;
  return cardElement;
};

const displayCards = (deck) => {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  deck.forEach(card => {
      container.appendChild(createCardElement(card));
  });
};

const bubbleSort = (deck) => {
  const sortingHistory = document.getElementById("sortingHistory");
  sortingHistory.innerHTML = "";

  const steps = [];
  steps.push([...deck]);

  const showStep = (deckState, stepNumber, isOriginal = false) => {
    const stepContainer = document.createElement("div");
    stepContainer.className = "step-container";

    const stepTitle = document.createElement("h3");
    stepTitle.textContent = isOriginal ? "Original:" : `Paso ${stepNumber}:`;
    stepContainer.appendChild(stepTitle);

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-container";

    deckState.forEach(card => {
        cardsContainer.appendChild(createCardElement(card));
    });

    stepContainer.appendChild(cardsContainer);
    sortingHistory.appendChild(stepContainer);
  };

  showStep(deck, 0, true);

  let stepCount = 1;
  const n = deck.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (deck[j].value > deck[j + 1].value) {
        // Intercambiar elementos
        let temp = deck[j];
        deck[j] = deck[j + 1];
        deck[j + 1] = temp;

        steps.push([...deck]);
        showStep(deck, stepCount);
        stepCount++;
      }
    }
  }

  displayCards(deck);
};

window.onload = () => {

  const drawButton = document.getElementById("draw");
  const sortButton = document.getElementById("sort");
  const quantityInput = document.getElementById("quantity");

  let currentDeck = [];

  drawButton.addEventListener("click", () => {
    const sortingHistory = document.getElementById("sortingHistory");
    sortingHistory.innerHTML = "";
    const quantity = parseInt(quantityInput.value);
    if (quantity && quantity > 0 && quantity <= 13) {
        currentDeck = generateDeck(quantity);
        displayCards(currentDeck);
    } else {
        alert("Por favor ingresa un número entre 1 y 13");
    }
});

  sortButton.addEventListener("click", () => {
    if (currentDeck.length > 0) {
      bubbleSort(currentDeck);
    }
  });
};