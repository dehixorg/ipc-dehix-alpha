function addProjectDomain(projectDomain, projectDomainList, updateProjects) {
    const newProjectDomain = projectDomain.trim();
  
    if (projectDomainList.some((s) => s.label === newProjectDomain)) {
      console.warn(`${newProjectDomain} already exists in the dropdown.`);
      return projectDomainList;
    }
  
    const updatedProjectDomainsList = [
      ...projectDomainList,
      { label: newProjectDomain },
    ];
    updateProjects(updatedProjectDomainsList);
  
    return updatedProjectDomainsList;
  }
  
  export { addProjectDomain };
  