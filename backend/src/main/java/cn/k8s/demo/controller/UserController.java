package cn.k8s.demo.controller;

import cn.k8s.demo.dao.UserDao;
import cn.k8s.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/user")
    public List<User> getUserList() {
        return userDao.findAll();
    }



}
