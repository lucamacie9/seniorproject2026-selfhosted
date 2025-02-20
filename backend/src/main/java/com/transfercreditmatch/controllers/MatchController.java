package com.transfercreditmatch.controllers;

import com.transfercreditmatch.dto.MatchRequest;
import com.transfercreditmatch.services.CourseMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/match")
public class MatchController {

    private final CourseMatchService courseMatchService;

    public MatchController(CourseMatchService courseMatchService) {
        this.courseMatchService = courseMatchService;
    }

    /**
     * POST endpoint to calculate the match coverage between two courses.
     * Example Request JSON:
     * {
     *    "courseIdFrom": 1,
     *    "courseIdTo": 2
     * }
     *
     * @param request the match request DTO containing two course IDs
     * @return a response with the match coverage percentage
     */
    @PostMapping
    public ResponseEntity<String> matchCourses(@RequestBody MatchRequest request) {
        double coverage = courseMatchService.calculateMatchCoverage(
                request.getCourseIdFrom(), request.getCourseIdTo());
        String resultMessage = "Match Coverage: " + (coverage * 100) + "%";
        return ResponseEntity.ok(resultMessage);
    }
}
