package com.mvyv.march11webapp.controller;

import com.mvyv.march11webapp.domain.User;
import com.mvyv.march11webapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/getAll")
  public ResponseEntity<List<String>> getAllItems() {
    List<String> list = Arrays.asList("1", "2", "3");
    return ResponseEntity.ok(list);
  }

  @GetMapping("/")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<User>> getAll(){
    return ResponseEntity.ok(userService.getAll());
  }

  @GetMapping("/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<User> getById(@PathVariable("id") Long id) {
    Optional<User> userOptional = userService.getById(id);
    if (userOptional.isPresent()) {
      return ResponseEntity.ok(userOptional.get());
    }
    return ResponseEntity.notFound().build();
  }

  @PostMapping
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<User> addNewUser(@RequestBody User user) {
    return ResponseEntity.ok(userService.save(user));
  }
}
