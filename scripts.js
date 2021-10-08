function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
};

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  // remove the popup entirely!
  popup.remove();
  /* eslint-disable no-param-reassign */
  popup = null;
  /* eslint-disable no-param-reassign */
;}

function ask(options) {
  return new Promise(async function(resolve) {
    // First, need to create a popup with all the fields in it
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin', 
      `<fieldset>
      <label>${options.title}</label>
      <input type="text" name="input" />
      <button type="submit">Submit</button>
    </fieldset>
    `);
    
    // Second, check if they want a cancel button
    if(options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstElementChild.appendChild(skipButton);
      // TODO: listen for a click on that cancel button
      skipButton.addEventListener('click', function() {
        resolve(null);
        destroyPopup(popup)
      }, { once:true });
    };

    // Listen for the submit event on the inputs
    popup.addEventListener('submit', function(e) {
      e.preventDefault();
      resolve(e.target.input.value)
      // remove it from the DOM entirely
      destroyPopup(popup)
    }, {once: true})

    // Third, listen for the submit event on the inouts
    // Fourth, when someone does submit it resolve the data that was in the input box

    // insert that popup into the DOM
    document.body.appendChild(popup);
    // put a very small timeout before we add the open class
    await wait(50);
    popup.classList.add('open');
  });
}

//  select all buttons that have a data-question
async function askQuestion(e) {
  const button = e.currentTarget;
  const cancel = 'cancel' in button.dataset;

  const answer = await ask({ 
    title: button.dataset.question, 
    cancel,
  });

};
const buttons = document.querySelectorAll('[data-question');
buttons.forEach(button => button.addEventListener('click', askQuestion));