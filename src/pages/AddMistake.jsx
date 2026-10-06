import React, { useState } from 'react';
import { AddMistakeModal } from '../components/AddMistakeModal';
import { useAddMistake } from '../hooks/useAddMistake';

const AddMistake = () => {
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    mistake: '',
    mistake_image: '',
  });

  const { adding, addMistakeToPenaltyBoard } = useAddMistake();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.mistake.trim()) {
      setError('Employee name and mistake are required.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      await addMistakeToPenaltyBoard(form);

      setSuccess(`Mistake added for ${form.name.trim()}.`);
      setForm({ name: '', mistake: '', mistake_image: '' });
    } catch (err) {
      setError(err?.message || 'Failed to add mistake.');
    }
  };

  return (
    <div>
      {showModal && (
        <AddMistakeModal
          form={form}
          setForm={setForm}
          loading={adding}
          error={error}
          success={success}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddMistake;
