'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { US_STATES, ENTITY_TYPES } from '../../lib/format';

const EMPTY_ENTITY = {
  entity_name: '',
  entity_type: '',
  ein: '',
  state_of_formation: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  is_foreign_filed: false,
  foreign_filed_states: [],
  notes: '',
};

export function EntitiesTab({ borrowerId, entities, onRefresh, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_ENTITY);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  }

  function openAddForm() {
    setForm(EMPTY_ENTITY);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  }

  function openEditForm(entity) {
    setForm({
      entity_name: entity.entity_name || '',
      entity_type: entity.entity_type || '',
      ein: entity.ein || '',
      state_of_formation: entity.state_of_formation || '',
      address_line1: entity.address_line1 || '',
      address_line2: entity.address_line2 || '',
      city: entity.city || '',
      state: entity.state || '',
      zip: entity.zip || '',
      country: entity.country || 'US',
      is_foreign_filed: entity.is_foreign_filed || false,
      foreign_filed_states: entity.foreign_filed_states || [],
      notes: entity.notes || '',
    });
    setEditingId(entity.id);
    setErrors({});
    setShowForm(true);
  }

  function validate() {
    const newErrors = {};
    if (!form.entity_name.trim()) newErrors.entity_name = 'Entity name is required';
    if (!form.entity_type) newErrors.entity_type = 'Entity type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const payload = { ...form, borrower_id: borrowerId };

    // Clean empty strings to null
    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === 'string' && payload[key].trim() === '' && key !== 'entity_name') {
        payload[key] = null;
      }
    });

    if (payload.foreign_filed_states?.length === 0) {
      payload.foreign_filed_states = null;
    }

    let error;
    if (editingId) {
      const res = await supabase.from('borrower_entities').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('borrower_entities').insert([payload]);
      error = res.error;
    }

    setSaving(false);

    if (error) {
      showToast('error', `Save failed: ${error.message}`);
      return;
    }

    showToast('success', editingId ? 'Entity updated' : 'Entity added');
    setShowForm(false);
    setEditingId(null);
    onRefresh();
  }

  async function handleDelete(entityId) {
    if (!confirm('Delete this entity? This cannot be undone.')) return;

    const { error } = await supabase.from('borrower_entities').delete().eq('id', entityId);
    if (error) {
      showToast('error', `Delete failed: ${error.message}`);
      return;
    }
    showToast('success', 'Entity deleted');
    onRefresh();
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          Business entities associated with this borrower.
        </p>
        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openAddForm}>
          + Add Entity
        </button>
      </div>

      {/* Entity Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit Entity' : 'Add Entity'}</h3>
            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="admin-field admin-form-full">
                  <label className="admin-label">
                    Entity Name <span className="required">*</span>
                  </label>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="Smith Capital Holdings LLC"
                    value={form.entity_name}
                    onChange={(e) => updateField('entity_name', e.target.value)}
                  />
                  {errors.entity_name && <span className="admin-field-error">{errors.entity_name}</span>}
                </div>
                <div className="admin-field">
                  <label className="admin-label">
                    Entity Type <span className="required">*</span>
                  </label>
                  <select
                    className="admin-input"
                    value={form.entity_type}
                    onChange={(e) => updateField('entity_type', e.target.value)}
                  >
                    <option value="">Select type</option>
                    {ENTITY_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.entity_type && <span className="admin-field-error">{errors.entity_type}</span>}
                </div>
                <div className="admin-field">
                  <label className="admin-label">EIN</label>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="12-3456789"
                    value={form.ein}
                    onChange={(e) => updateField('ein', e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">State of Formation</label>
                  <select
                    className="admin-input"
                    value={form.state_of_formation}
                    onChange={(e) => updateField('state_of_formation', e.target.value)}
                  >
                    <option value="">Select state</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field admin-form-full">
                  <label className="admin-label">Address Line 1</label>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="123 Business Ave"
                    value={form.address_line1}
                    onChange={(e) => updateField('address_line1', e.target.value)}
                  />
                </div>
                <div className="admin-field admin-form-full">
                  <label className="admin-label">Address Line 2</label>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="Suite 500"
                    value={form.address_line2}
                    onChange={(e) => updateField('address_line2', e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">City</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">State</label>
                  <select
                    className="admin-input"
                    value={form.state}
                    onChange={(e) => updateField('state', e.target.value)}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label className="admin-label">ZIP</label>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="75201"
                    value={form.zip}
                    onChange={(e) => updateField('zip', e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Country</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                  />
                </div>
                <div className="admin-field admin-form-full">
                  <div className="admin-checkbox-group">
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      id="is_foreign_filed"
                      checked={form.is_foreign_filed}
                      onChange={(e) => updateField('is_foreign_filed', e.target.checked)}
                    />
                    <label htmlFor="is_foreign_filed" className="admin-checkbox-label">
                      Foreign filed in other states
                    </label>
                  </div>
                </div>
                {form.is_foreign_filed && (
                  <div className="admin-field admin-form-full">
                    <label className="admin-label">Foreign Filed States</label>
                    <input
                      className="admin-input"
                      type="text"
                      placeholder="TX, CA, NY (comma separated)"
                      value={(form.foreign_filed_states || []).join(', ')}
                      onChange={(e) => updateField(
                        'foreign_filed_states',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )}
                    />
                  </div>
                )}
                <div className="admin-field admin-form-full">
                  <label className="admin-label">Notes</label>
                  <textarea
                    className="admin-textarea"
                    placeholder="Notes about this entity..."
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : editingId ? 'Update Entity' : 'Add Entity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Entity List */}
      {entities.length === 0 ? (
        <div className="admin-form-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
            No entities yet. Add a business entity to associate with this borrower.
          </p>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openAddForm}>
            + Add First Entity
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {entities.map((entity) => (
            <div key={entity.id} className="admin-entity-card">
              <div className="admin-entity-header">
                <div>
                  <div className="admin-entity-name">{entity.entity_name}</div>
                  <div className="admin-entity-type">
                    <span className="admin-badge admin-badge-blue">{entity.entity_type}</span>
                    {entity.state_of_formation && (
                      <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                        Formed in {entity.state_of_formation}
                      </span>
                    )}
                  </div>
                </div>
                <div className="admin-entity-actions">
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => openEditForm(entity)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(entity.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="admin-entity-grid">
                {entity.ein && (
                  <div className="admin-entity-field">
                    <label>EIN</label>
                    <span>{entity.ein}</span>
                  </div>
                )}
                {(entity.address_line1 || entity.city) && (
                  <div className="admin-entity-field">
                    <label>Address</label>
                    <span>
                      {[entity.address_line1, entity.address_line2].filter(Boolean).join(', ')}
                      {entity.city && `, ${entity.city}`}
                      {entity.state && `, ${entity.state}`}
                      {entity.zip && ` ${entity.zip}`}
                    </span>
                  </div>
                )}
                {entity.is_foreign_filed && entity.foreign_filed_states?.length > 0 && (
                  <div className="admin-entity-field">
                    <label>Foreign Filed</label>
                    <span>{entity.foreign_filed_states.join(', ')}</span>
                  </div>
                )}
                {entity.notes && (
                  <div className="admin-entity-field" style={{ gridColumn: '1 / -1' }}>
                    <label>Notes</label>
                    <span>{entity.notes}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default EntitiesTab;
