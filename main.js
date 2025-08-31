$(function () {
  //initializing variables
  const API_URL = "https://geoapi.info/api/";
  const API_COUNTRIES_LIMIT = 245;
  const firstSelectId = "autocomplete-one";
  const secondSelectId = "autocomplete-two";
  const availableTags = [];
  const availableCountries = [];
  let firstSelected = false;
  let secondSelected = false;

  //handler for selecting in autocomplete
  const handleAutocompleteSelect = (e, ui) => {
    availableTags.forEach((el) => {
      if (el.name === ui.item.value) {
        fetch(API_URL + `country?code=${el.code}`)
          .then((r) => r.json())
          .then((data) => {
            if (e.target.id === firstSelectId) {
              handleResponse(firstSelectId, data);
              firstSelected = true;
            } else if (e.target.id === secondSelectId) {
              handleResponse(secondSelectId, data);
              secondSelected = true;
            }
          })
          .then(() => {
            if (firstSelected && secondSelected) {
              $(".compare-info").slideToggle(600);
            }
          });
      }
    });
  };

  const handleResponse = (id, element) => {
    $(`#${id}_surface`).text(() => {
      return element.surfaceArea ? `${element.surfaceArea}` : "n/a";
    });

    $(`#${id}_name`).text(() => {
      return element.name ? `${element.name}` : "n/a";
    });

    $(`#${id}_population`).text(() => {
      return element.population ? `${element.population}` : "n/a";
    });

    $(`#${id}_population-density`).text(() => {
      return element.populationDensity ? `${element.populationDensity}` : "n/a";
    });

    $(`#${id}_life-expectancy`).text(() => {
      return element.lifeExpectancy ? `${element.lifeExpectancy}` : "n/a";
    });

    $(`#${id}_average-temperature`).text(() => {
      return element.averageTemperature
        ? `${element.averageTemperature}`
        : "n/a";
    });

    $(`#${id}_flag`).attr("src", `${element.flags.rectangular}`);

    $(`#${id}_government-type`).text(() => {
      return element.governmentType ? `${element.governmentType}` : "n/a";
    });

    $(`#${id}_religion`).text(() => {
      return element.religion ? `${element.religion}` : "n/a";
    });

    $(`#${id}_driving-side`).text(() => {
      return element.drivingSide ? `${element.drivingSide}` : "n/a";
    });

    $(`#${id}_continent`).text(() => {
      return element.continent ? `${element.continent}` : "n/a";
    });

    $(`#${id}_capital-city`).text(() => {
      return element.capitalCity ? `${element.capitalCity}` : "n/a";
    });

    $(`#${id}_currency`).text(() => {
      return element.currencyName ? `${element.currencyName}` : "n/a";
    });
  };

  //initially hide table
  $(".compare-info").hide();

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
