package com.mvyv.march11webapp.controller;

import com.mvyv.march11webapp.domain.User;
import com.mvyv.march11webapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<Void> index() {
    System.out.println("index load");
    return ResponseEntity.noContent().build();
  }

  @PreAuthorize("hasAnyRole('ADMIN')")
  @RequestMapping("/getAll")
  public ResponseEntity<List<String>> getAllItems() {
    List<String> list = Arrays.asList("1", "2", "3");
    return ResponseEntity.ok(list);
  }

  @RequestMapping("/hello")
  public ResponseEntity<List<User>> sayHello(){
    return ResponseEntity.ok(userService.getAll());
  }
}
