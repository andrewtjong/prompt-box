function ask(options) {
  return new Promise(function(resolve) {
    // First, need to create a popup with all the fields in it
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin', `
    <fieldset>
    <label>${options.title}</label>
    </fieldset>
    `);
    console.log(popup);
    // Second, check if they want a cancel button
    // Third, listen for the submit event on the inouts
    // Fourth, when someone does submit it resolve the data that was in the input box
  })
}