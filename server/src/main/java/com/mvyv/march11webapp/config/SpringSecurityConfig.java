package com.mvyv.march11webapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@Configurable
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;

  @Autowired
  public SpringSecurityConfig(UserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService)
      .passwordEncoder(getPasswordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.authorizeRequests()
      .antMatchers("**/getAllItems").authenticated()
      .antMatchers("/hello").hasAuthority("ADMIN")
      .anyRequest().permitAll()
      .and().formLogin().permitAll();
  }

  private PasswordEncoder getPasswordEncoder() {
    return new PasswordEncoder() {
      @Override
      public String encode(CharSequence charSequence) {
        return charSequence.toString();
      }

      @Override
      public boolean matches(CharSequence charSequence, String s) {
        return true;
      }
    };
  }


//  private final DataSource dataSource;
//
//  @Autowired
//  public SpringSecurityConfig(DataSource dataSource) {
//    this.dataSource = dataSource;
//  }
//
//  @Value("${spring.queries.users-query}")
//  private String usersQuery;
//
//  @Value("${spring.queries.roles-query}")
//  private String rolesQuery;
//
//  public BCryptPasswordEncoder passwordEncoder() {
//    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//    return bCryptPasswordEncoder;
//  }
//
//  @Override
//  protected void configure(AuthenticationManagerBuilder auth)
//    throws Exception {
//    auth.
//      jdbcAuthentication()
//      .usersByUsernameQuery(usersQuery)
//      .authoritiesByUsernameQuery(rolesQuery)
//      .dataSource(dataSource)
//      .passwordEncoder(passwordEncoder());
//  }
//
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//
//    http.
//      authorizeRequests()
//      .antMatchers("/").hasAuthority("ADMIN")
//      .antMatchers("/login").permitAll()
//      .antMatchers("/registration").permitAll()
//      .antMatchers("/admin/**").hasAuthority("ADMIN").anyRequest()
//      .authenticated().and().csrf().disable().formLogin()
//      .loginPage("/login").failureUrl("/login?error=true")
//        .defaultSuccessUrl("/admin/home")
//        .usernameParameter("email")
//        .passwordParameter("password")
//      .and().logout()
//        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//        .logoutSuccessUrl("/").and().exceptionHandling()
//        .accessDeniedPage("/access-denied");
//  }
//
//  @Override
//  public void configure(WebSecurity web) throws Exception {
//    web
//      .ignoring()
//      .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
//  }
}
