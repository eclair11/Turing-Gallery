package fr.ujm.turgal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import fr.ujm.turgal.model.JwtRequest;
import fr.ujm.turgal.model.User;

/**
 * AuthRestControllerTests
 */
public class AuthRestControllerTests extends AbstractTest {

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
    }

    @Test
    public void createAccount() throws JsonProcessingException, Exception {
        String uri = "/api/v1/authentification/inscription";
        User user = new User("usertest", "usertest");
        MvcResult mvcResult = mvc.perform(
                MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON).content(mapToJson(user)))
                .andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(200, status);
        assertTrue(content.length() > 0);
    }

    @Test
    public void connectAccount() throws JsonProcessingException, Exception {
        String uri = "/api/v1/authentification/authenticate";
        JwtRequest credentials = new JwtRequest("usertest", "usertest");
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON)
                .content(mapToJson(credentials))).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(200, status);
        assertTrue(content.length() > 0);
    }

}