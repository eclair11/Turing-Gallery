package fr.ujm.turgal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.ujm.turgal.model.Photo;
import fr.ujm.turgal.model.PhotoRepository;

/**
 * ApiController
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    public PhotoRepository photoRep;
    

    @RequestMapping("/photos")
    public List<Photo> getAllPhotos() {
        return photoRep.findAll();
    }

}