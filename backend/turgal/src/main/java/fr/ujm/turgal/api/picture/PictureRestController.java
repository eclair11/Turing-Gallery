package fr.ujm.turgal.api.picture;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.ujm.turgal.model.Picture;
import fr.ujm.turgal.model.PictureRepository;

/**
 * PictureRestController
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class PictureRestController {

    private static final int PAGE_SIZE = 20;

    @Autowired
    PictureRepository picRepo;

    @PersistenceContext
    EntityManager entityManager;

    @GetMapping(value = "/pictures/{id}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Object> getPictures(@PathVariable Long id, @PathVariable int page) {

        List<Object> result = new ArrayList<>();
        int pageNumber = page;
        int pageSize = PAGE_SIZE;

        Query query = entityManager.createQuery("From Picture p Where p.user.id LIKE " + id);
        query.setFirstResult((pageNumber - 1) * pageSize);
        query.setMaxResults(pageSize);
        result = query.getResultList();

        Query queryTotal = entityManager.createQuery("Select count(p.id) From Picture p Where p.user.id LIKE " + id);
        long countResult = (long) queryTotal.getSingleResult();
        result.add(countResult);

        return result;

    }

    @PostMapping(value = "/import", consumes = { "multipart/form-data" })
    public ResponseEntity<String> importPictures(HttpServletRequest request, @RequestParam(name = "pictures") MultipartFile[] pictures) {
        String[] widths = request.getParameterValues("widths");
        String[] heights = request.getParameterValues("heights");
        String[] sizes = request.getParameterValues("sizes");
        int i = 0;
        while (i < sizes.length) {
            Picture picture = new Picture();
            picture.setWidth(Integer.valueOf(widths[i]));
            picture.setHeight(Integer.valueOf(heights[i]));
            picture.setSize(Integer.valueOf(sizes[i]));
            MultiFilesUpload(pictures, picture, i);
            picRepo.save(picture);
            i++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    private void MultiFilesUpload(MultipartFile[] pictures, Picture picture, int i) {
        MultipartFile file = pictures[i];
        picture.setTitle(file.getOriginalFilename());
        try {
            picture.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PutMapping(value = "/delete/{id}/{pics}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deletePictures(@PathVariable Long id, @PathVariable Object pics) {

    }

}