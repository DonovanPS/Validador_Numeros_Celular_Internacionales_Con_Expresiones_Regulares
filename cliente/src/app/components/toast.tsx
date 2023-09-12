import React, { useEffect, useRef } from 'react';
import { Toast as PrimeToast } from 'primereact/toast';

const ShowToast = ({ severity, summary, detail, show }) => {
  const toast = useRef<PrimeToast | null>(null);

  useEffect(() => {
    if (toast.current && detail) {
      toast.current.show({
        severity,
        summary,
        detail,
        life: 3000,
      });
    }
  }, [show]);

  return (
    <div>
      <PrimeToast ref={toast} position="top-right" />
    </div>
  );
};

export default ShowToast;
