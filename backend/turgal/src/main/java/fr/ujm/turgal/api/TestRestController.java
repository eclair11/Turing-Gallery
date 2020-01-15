package fr.ujm.turgal.api;

import fr.ujm.turgal.model.Test;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
class TestRestController {
    @RequestMapping(value = "/api/v1/tests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Test[] getClassesAction() {
        // envoyer quelques données type test à afficher par notre client angular
        Test[] tests = new Test[10];
        for (int i = 0; i < 10; i++) {
            tests[i] = new Test("Test " + i);
        }
        return tests;
    }
}