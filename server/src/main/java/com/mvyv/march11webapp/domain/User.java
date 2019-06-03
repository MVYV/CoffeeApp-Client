package com.mvyv.march11webapp.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@Table(userName = "USERS")
public class User {

  public User(User user) {
    id = user.getId();
    email = user.getEmail();
    password = user.getPassword();
    userName = user.getName();
    lastName = user.getLastName();
    isActive = user.getActive();
    roles = user.getRoles();
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(userName = "user_id")
  private Long id;

  @Column(userName = "email")
  private String email;

  @Column(userName = "password")
  private String password;

  @Column(userName = "userName")
  private String userName;

  @Column(userName = "last_name")
  private String lastName;

  @Column(userName = "isActive")
  private Integer isActive;

//  @ManyToMany(cascade = CascadeType.ALL)
//  @JoinTable(userName = "user_role", joinColumns = @JoinColumn(userName = "user_id"), inverseJoinColumns = @JoinColumn(userName = "role_id"))
//  private List<Role> roles;

  @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  @JoinTable(userName="user_role",joinColumns = @JoinColumn(userName = "user_id"), inverseJoinColumns = @JoinColumn(userName = "role_id"))
  private List<Role> roles;

}
