package fr.ujm.turgal.api.picture;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.ujm.turgal.model.Picture;

/**
 * PictureRestController
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class PictureRestController {

    @GetMapping(value="/pictures", produces = MediaType.APPLICATION_JSON_VALUE)
    public Picture[] getPictures() {
        Picture[] pictures = new Picture[10];
        return pictures;
    }
    
}