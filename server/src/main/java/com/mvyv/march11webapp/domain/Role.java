package com.mvyv.march11webapp.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
@Table(userName = "ROLES")
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(userName = "role_id")
  private int id;

  @Column(userName = "role")
  private String role;
}
