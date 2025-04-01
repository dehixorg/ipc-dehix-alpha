export function addDomain(domain, domainList, updateDomains) {
    const newDomain = domain.trim();
  
    if (domainList.some((s) => s.label === newDomain)) {
      console.warn(`${newDomain} already exists in the dropdown.`);
      return domainList;
    }
  
    const updatedDomainsList = [...domainList, { label: newDomain }];
    updateDomains(updatedDomainsList);
  
    return updatedDomainsList;
  }

  