rootApp.service("typeChecker", function () {

    this.trainerOptions = ["Trainer-Item", "Trainer-Stadium", "Trainer-Supporter", "Pokemon Tool"];
    this.notPokemonOptions = ["Trainer-Item", "Trainer-Stadium", "Trainer-Supporter", "Pokemon Tool", "Energy"];


    this.isPokemon = function (type) {
        if (this.notPokemonOptions.indexOf(type) == -1) {
            return true;
        }
        else {
            return false;
        }
    };

    this.isTrainer = function (type) {
        if (this.trainerOptions.indexOf(type) != -1) {
            return true;
        }
        else {
            return false;
        }
    };
});
