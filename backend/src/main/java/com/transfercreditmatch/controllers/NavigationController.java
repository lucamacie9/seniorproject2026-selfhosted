package com.transfercreditmatch.controllers;

import com.transfercreditmatch.entities.Institution;
import com.transfercreditmatch.entities.Program;
import com.transfercreditmatch.entities.KnowledgeUnit;
import com.transfercreditmatch.repositories.InstitutionRepository;
import com.transfercreditmatch.repositories.ProgramRepository;
import com.transfercreditmatch.repositories.KnowledgeUnitRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NavigationController {

    private final InstitutionRepository institutionRepo;
    private final ProgramRepository programRepo;
    private final KnowledgeUnitRepository kuRepo;

    public NavigationController(InstitutionRepository institutionRepo,
                                ProgramRepository programRepo,
                                KnowledgeUnitRepository kuRepo) {
        this.institutionRepo = institutionRepo;
        this.programRepo = programRepo;
        this.kuRepo = kuRepo;
    }

    @GetMapping("/institutions")
    public List<Institution> getAllInstitutions() {
        return institutionRepo.findAll();
    }

    @GetMapping("/programs")
    public List<Program> getAllPrograms() {
        return programRepo.findAll();
    }

    @GetMapping("/knowledge_units")
    public List<KnowledgeUnit> getAllKnowledgeUnits() {
        return kuRepo.findAll();
    }
}
