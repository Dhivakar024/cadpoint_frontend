import React, { createContext, useContext, useState, useEffect } from 'react';

const CONSENT_STORAGE_KEY = 'cadpoint_cookie_consent_v1';

const DEFAULT_CONSENT = {
  version: '1.0',
  timestamp: null,
  hasMadeChoice: false,
  status: 'pending',
  categories: {
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  },
};

const CookieConsentContext = createContext();

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === '1.0' && parsed.categories) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Unable to read cookie consent from storage', e);
    }
    return DEFAULT_CONSENT;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveConsent = (categories, status) => {
    const updated = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      hasMadeChoice: true,
      status: status,
      categories: {
        necessary: true, // Always true
        analytics: Boolean(categories.analytics),
        functional: Boolean(categories.functional),
        marketing: Boolean(categories.marketing),
      },
    };

    setConsent(updated);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to save cookie consent to storage', e);
    }
  };

  const acceptAll = () => {
    saveConsent(
      { necessary: true, analytics: true, functional: true, marketing: true },
      'accepted_all'
    );
    setIsModalOpen(false);
  };

  const rejectOptional = () => {
    saveConsent(
      { necessary: true, analytics: false, functional: false, marketing: false },
      'rejected_optional'
    );
    setIsModalOpen(false);
  };

  const saveCustomPreferences = (customCategories) => {
    saveConsent(customCategories, 'custom');
    setIsModalOpen(false);
  };

  const openPreferencesModal = () => {
    setIsModalOpen(true);
  };

  const closePreferencesModal = () => {
    setIsModalOpen(false);
  };

  const isCategoryConsented = (category) => {
    if (category === 'necessary') return true;
    return Boolean(consent?.categories?.[category]);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasMadeChoice: consent.hasMadeChoice,
        categories: consent.categories,
        isModalOpen,
        acceptAll,
        rejectOptional,
        saveCustomPreferences,
        openPreferencesModal,
        closePreferencesModal,
        isCategoryConsented,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
