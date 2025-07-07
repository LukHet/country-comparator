$(function () {
  //initializing variables
  const API_URL = "https://geoapi.info/api/";
  const API_COUNTRIES_LIMIT = 245;
  const firstSelectId = "autocomplete-one";
  const secondSelectId = "autocomplete-two";
  const buttonId = "get-button";
  const availableTags = [];
  const availableCountries = [];

  //handler for selecting in autocomplete
  const handleAutocompleteSelect = (e, ui) => {
    console.log(e);
    availableTags.forEach((el) => {
      if (el.name === ui.item.value) {
        fetch(API_URL + `country?code=${el.code}`)
          .then((r) => r.json())
          .then((data) => {
            if (e.target.id === firstSelectId) {
              handleResponse(firstSelectId, data);
            } else if (e.target.id === secondSelectId) {
              handleResponse(secondSelectId, data);
            }
          });
      }
    });
  };

  const handleResponse = (id, element) => {
    $(`#${id}_surface`).text(() => {
      return `${element.surfaceArea}`;
    });
  };

  $(`#${buttonId}`).on("click", () => {
    alert("Handler for `click` called.");
  });

  //fetching all existing countries
  fetch(API_URL + `countries?limit=${API_COUNTRIES_LIMIT}`)
    .then((r) => r.json())
    .then((data) => {
      data.countries.forEach((el) => {
        availableTags.push({ name: el.name, code: el.code });
      });
      availableTags.forEach((el) => availableCountries.push(el.name));
    });

  //assigning existing countries to both autocpmplete inputs
  $(`#${firstSelectId}, #${secondSelectId}`).autocomplete({
    source: function (request, response) {
      const matcher = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(request.term), //matching only first letters
        "i"
      );
      response(
        $.grep(availableCountries, function (item) {
          return matcher.test(item);
        })
      );
    },
    select: (e, ui) => handleAutocompleteSelect(e, ui),
  });
});
