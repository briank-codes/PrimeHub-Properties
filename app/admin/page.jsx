'use client'
import { useEffect, useState } from 'react'

export default function AdminListings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', price: '', location: '', type: 'sale', category: 'home', description: '' })
  const [editingId, setEditingId] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/listings')
      const j = await res.json()
      if (j.ok) setItems(j.results || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function updateField(k, v) { setForm(prev => ({ ...prev, [k]: v })) }

  async function submit(e) {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price || 0),
      location: { area: form.location, county: '' },
      specs: { bedrooms: null, bathrooms: null, size: null },
    }
    try {
      const res = await fetch('/api/admin/listings' + (editingId ? '' : ''), {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      })
      const j = await res.json()
      if (j.ok) {
        await load()
        setForm({ title: '', price: '', location: '', type: 'sale', category: 'home', description: '' })
        setEditingId(null)
      }
    } catch (e) { console.error(e) }
  }

  function startEdit(item) {
    setEditingId(item.id)
    setForm({ title: item.title || '', price: String(item.price || ''), location: item.location?.area || '', type: item.type || 'sale', category: item.category || 'home', description: item.description || '' })
  }

  async function remove(id) {
    if (!confirm('Delete listing?')) return
    await fetch('/api/admin/listings?id=' + encodeURIComponent(id), { method: 'DELETE' })
    await load()
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Admin — Listings</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: '8px', maxWidth: '600px' }}>
        <input placeholder="Title" value={form.title} onChange={e=>updateField('title', e.target.value)} />
        <input placeholder="Price" value={form.price} onChange={e=>updateField('price', e.target.value)} />
        <input placeholder="Location (area)" value={form.location} onChange={e=>updateField('location', e.target.value)} />
        <select value={form.type} onChange={e=>updateField('type', e.target.value)}>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <select value={form.category} onChange={e=>updateField('category', e.target.value)}>
          <option value="home">Home</option>
          <option value="plot">Plot</option>
        </select>
        <textarea placeholder="Short description" value={form.description} onChange={e=>updateField('description', e.target.value)} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit">{editingId ? 'Save' : 'Add'}</button>
          {editingId && <button type="button" onClick={()=>{ setEditingId(null); setForm({ title: '', price: '', location: '', type: 'sale', category: 'home', description: '' }) }}>Cancel</button>}
        </div>
      </form>

      <hr style={{ margin: '24px 0' }} />

      <div>
        {loading ? (<div>Loading…</div>) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {items.map(item => (
              <div key={item.id} style={{ border: '1px solid var(--border)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{item.title}</strong>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.location?.area} — {item.category} — {item.type}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={()=>startEdit(item)}>Edit</button>
                    <button onClick={()=>remove(item.id)}>Delete</button>
                  </div>
                </div>
                <p style={{ marginTop: '8px' }}>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
